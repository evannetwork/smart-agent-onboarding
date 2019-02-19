/*
  Copyright (C) 2018-present evan GmbH.

  This program is free software: you can redistribute it and/or modify it
  under the terms of the GNU Affero General Public License, version 3,
  as published by the Free Software Foundation.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
  See the GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License along with this program.
  If not, see http://www.gnu.org/licenses/ or write to the

  Free Software Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA, 02110-1301 USA,

  or download the license from the following URL: https://evan.network/license/

  You can be released from the requirements of the GNU Affero General Public License
  by purchasing a commercial license.
  Buying such a license is mandatory as soon as you use this software or parts of it
  on other blockchains than evan.network.

  For more information, please contact evan GmbH at this address: https://evan.network/license/
*/

'use strict'
const {Initializer, api} = require('actionhero')
const nodemailer = require('nodemailer')
const {promisify} = require('util')
const _ = require('underscore')
const uuid = require('uuid')


const config = api.config.smartAgentOnboarding
let transport

module.exports = class SmartAgentOnboarding extends Initializer {
  constructor () {
    super()
    this.name = 'smartAgentOnboarding'
    this.loadPriority = 2400
    this.startPriority = 2400
    this.stopPriority = 2400
  }

  async initialize () {
    if (config.disabled) {
      return
    }
    class SmartAgentOnboarding extends api.smartAgents.SmartAgent {
      async initialize() {
        await super.initialize()
        transport = nodemailer.createTransport(config.mailTransportOptions)
      }

      async bindOnboardingListener() {
        try {
          let processingQueue = Promise.resolve()
          // get block from last uptime
          const lastBlock = (await api.redis.clients.client.get('evannetwork:smartAgentOnboarding:lastBlock')) || (await api.eth.web3.eth.getBlockNumber())
          await this.runtime.eventHub.subscribe(
            'EventHub',
            null,
            'MailEvent',
            async (event) => {
              // store block as uptime
              await api.redis.clients.client.set('evannetwork:smartAgentOnboarding:lastBlock', event.blockNumber)
              const {sender, recipient} = event.returnValues
              const mailboxDomain = this.runtime.nameResolver.getDomainName(api.config.eth.nameResolver.domains.mailbox)
              const mailboxAddress = await this.runtime.nameResolver.getAddress(mailboxDomain)
              // only handle mailbox events of registered mailbox, only handle mails to smart agent
              return mailboxAddress === sender && config.ethAccount === recipient
            },
            async (event) => {
              const that = this;
              const handleEvent = async () => {
                const {mailId, recipient} = event.returnValues
                const bmail = await that.runtime.mailbox.getMail(mailId)
                if (!bmail) {
                  throw new Error(`could not get onboarding bmail ${mailId}, see previous logs for details`)
                }

                const attachments = bmail.content.attachments
                if (attachments && attachments.length) {
                  const mailType = attachments[0].type
                  if (mailType === 'onboardingEmail') {
                    // if UTC was provided
                    const transferedWei = await that.runtime.mailbox.getBalanceFromMail(mailId)
                    if (parseInt(transferedWei, 10) > 0) {
                      api.smartAgentOnboarding.sendInvite(
                        bmail.content.from,
                        recipient,
                        0,
                        transferedWei,
                        attachments[0].data,
                        mailId,
                      )
                    } else {
                      api.log(
                        'onboardingEmail, sent, but no onboarding UTC was provided, ignoring this request',
                        'error'
                      )
                    }
                  }
                }
              }
              processingQueue = processingQueue
                .then(handleEvent)
                .catch((ex) => {
                  // log errors as warnings because events handled here MAY origin from older config states
                  api.log(`error occurred while handling event from block ${event.blockNumber}; ${ex.message || ex}`, 'warning')
                })
              return processingQueue
            },
            lastBlock
          )
        } catch (ex) {
          api.log(`could not bind onboardingListener; ${ ex.message || ex }`, 'warning')
        }
      }

      async sendInvite(from, to, amount, transferred, mailData, mailId = null) {
        // create onboarding session
        const sessionId = uuid.v4()
        api.log(`starting onboarding session "${sessionId}"`)
        await api.redis.clients.client.hmset(`evannetwork:smartAgentOnboarding:sessions:${sessionId}`, {
          inviter: from,
          invited: to,
          mailId,
          weiToSend: transferred || api.eth.web3.utils.toWei(amount)
        })
        if(typeof mailData == 'string'){
          mailData = JSON.parse(mailData)
        }

        if(!config.mailOptions.mailBody[mailData.lang]) mailData.lang = 'en'
        if(!amount && transferred) amount = api.eth.web3.utils.fromWei(transferred);

        const mailBody = _.template(config.mailOptions.mailBody[mailData.lang])({
          sessionId,
          inviteeAddress: from,
          inviteeAlias: mailData.fromAlias,
          eveAmount: amount,
          targetMail: mailData.to,
          inviteMail: mailData.body
        })
        const mail = {
          from: config.mailOptions.from,
          html: mailBody,
          subject: mailData.subject,
          to: mailData.to,
          attachments: [
            {
              filename:     'logo.png',
              contentType:  'image/png',
              cid:          'logoCID',
              path:      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALwAAAA+CAMAAACm74FKAAACKFBMVEUAAAD///////////////////////9ttrb///////////////////////////////9pw8P///////////9mzL////////////////////////////9hysH///////////////////9mxb3///////////9lycP///////////9jxb////////////////////////9kyMP///////////////////////////////9kx7////////////////////////////////////////9jxsL///////////////////////////////////////////9jx8JlxcD///////////////////////////////9lxsH///////////9kxsL///////////////////////////////////////////////////////////////////9kx8H///////////////////////////////////////////////////////////////////9kxsH///////////////////////9kxsL///////////////////9kxsH///////////////////////////////////////////////////////////////9kxsH///////////////////////////////////////////////////////////////////////////////9kxsH///9CLXkkAAAAtnRSTlMAAQIDBAUGBwcJCgsMDQ8QERESExQVFhcZGhscHR0fICEiIyMkJSYmKSssLC0uLzAxMzM0Nzg5PD0/QEBBQkNER0pLTE5QUFRWV1lbXF1eX2JkZWVmZ2lqbG1ub3FzdHV1eXp8fX5/gYOEhYaHiImKi4yMjo+RlpiZm6ChoqSlp6qrr7CwsbKztLa3uLq9v8DBw8TGx8jJysvMzc7P0dTW2d3d3t/l5unq7e/x8vP09/j6+/z9/hRUHnYAAAABYktHRLfdADtnAAAC40lEQVRo3u2a+VcSURTHLyCKlpC2aURiplmaWVlEqbRqtmAlaott0kahlK22WFmmtmtgWZpkWZalldD994L3xg7qTJNwcpDe56f73vty+cDM8IZzBuK1YgAhTkeIg/Go6ZKSDOSi/abTnE6MeBDlBIoRS3Lb6WAHTws7XVpGBsmi/Q6Q3EzR3GEmz+SZfCTKN14dT28w8uorgrTwyLt5cvcnKp/Hs3QnGPk/sIFH/jpPLp/JM3kmH8Hybc3j+RCMfGKzIK5/JS/VJsXkmTyT/9/k82SCQDDy9TyNJnWTGsVE5aXeYZk8k49k+aqNgsgD5R08gap7hAWB8g95clapf+f5OBTYL5w3KSbP5Jm8lPKrKsVQkNwi4UBOYL840X7ZJKeigwIepWS6tBwYDAaDwWBMWTb1VoSXUPGZv8+WYLU0knojLMmfzQ0UOcY5tIru6jFl+YtcUzRkm5IhyUSfXZFnmdK49NrUqIK0EXlFYQG5g4tZETIZotILSW4pWL1NiAP0Dk7zHHGojJQvfPekN/1FLa6HHjwHDlztHya0IXrqaIu+Jifu4uRlDVhOJjN+hswzUfm7JPcWrNiZZcdLZO4sblO2DCX6y8XYlUoOQiGenOt95YTOT+SLrcPTmU/QSOWxY18KlT96yvf5pJAvh2y8RebasfF2Nxr8ZSw6aU719WnJN/N3nYdGXDjN52qj8j80I+f8I2+rTBL5Ysjk5F+jo6amJn2UPDR9udA+D21oJqM3XiUUjcj3/75gceCzXmL5a7gFgJwIoPS4QUWqCuyphfduD72Sb2AR1PteMkb+omG4I1pa+ZSPw93v+uj6SxxsJYUWcTM0oItOp/fjID6Wj5Wvhmq8PPnyuRY9aCyFdDKh0n5sDS21x+3c/8tSixpWWgzc65L220qjaLnTzM2lWXIhancZefJvxpGQOXhekD30DbeS3N5w3LDXCR+UB2F/t8HkmTyTn0LyMfMFmTUq+AtuGDgVCJcpSQAAAABJRU5ErkJggg=='
            }
          ]
        }

        return promisify(transport.sendMail).bind(transport)(mail)
      }

      async sendReplyAccept(sessionId, accountId) {
        const { inviter, invited, weiToSend, mailId, } = await api.redis.clients.client.hgetall(
          `evannetwork:smartAgentOnboarding:sessions:${sessionId}`)
        if (!inviter || !invited) {
          throw new Error('invalid invitationId')
        }
        // withdraw UTC
        await api.redis.clients.client.del(`evannetwork:smartAgentOnboarding:sessions:${sessionId}`)

        if (mailId) {
          const transferedWei = await smartAgentOnboarding.mailbox.getBalanceFromMail(mailId)
          if (parseInt(transferedWei, 10) > 0) {
            await smartAgentOnboarding.mailbox.withdrawFromMail(mailId, accountId)
          } else {
            throw new Error('funds for this invitation already transferred')
          }
        } else {
          await this.runtime.executor.executeSend({
            from: config.ethAccount,
            gas: 100000,
            to: accountId,
            value: weiToSend,
          })
        }
      }

      async sendReplyReject(sessionId, bmailBody) {
        const { inviter, invited, weiToSend, mailId, } = await api.redis.clients.client.hgetall(
          `evannetwork:smartAgentOnboarding:sessions:${sessionId}`)
        if (!inviter || !invited) {
          throw new Error('invalid invitationId')
        }
        await api.redis.clients.client.del(`evannetwork:smartAgentOnboarding:sessions:${sessionId}`)
        smartAgentOnboarding.mailbox.sendMail(
          {
            content: {
              body: bmailBody,
              attachments: [{
                type: 'onboardingReject',
                data: {
                  from: invited,
                },
              }],
            },
          },
          config.ethAccount,
          inviter,
        )
        if (mailId) {
          const transferedWei = await smartAgentOnboarding.mailbox.getBalanceFromMail(mailId)
          if (parseInt(transferedWei, 10) > 0) {
            return await smartAgentOnboarding.mailbox.withdrawFromMail(mailId, inviter)
          } else {
            api.log('funds for this invitation already transferred', 'error')
          }
        } else {
          return await this.runtime.executor.executeSend({
            from: config.ethAccount,
            gas: 100000,
            to: inviter,
            value: weiToSend,
          })
        }
      }
    }
    const smartAgentOnboarding = new SmartAgentOnboarding(config)
    await smartAgentOnboarding.initialize()
    await smartAgentOnboarding.bindOnboardingListener()
    api.smartAgentOnboarding = smartAgentOnboarding
  }

  async start () {}
  async stop () {}
}

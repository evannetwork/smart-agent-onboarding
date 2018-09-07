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
                const bmail = await that.mailbox.getMail(mailId)
                if (!bmail) {
                  throw new Error(`could not get onboarding bmail ${mailId}, see previous logs for details`)
                }

                const attachments = bmail.content.attachments
                if (attachments && attachments.length) {
                  const mailType = attachments[0].type
                  if (mailType === 'onboardingEmail') {
                    // if UTC was provided
                    const transferedWei = await that.mailbox.getBalanceFromMail(mailId)
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
          to: mailData.to
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

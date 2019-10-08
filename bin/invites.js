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

  
*/

'use strict'
const {api, CLI} = require('actionhero')

module.exports = class InvitesCLI extends CLI {
  constructor () {
    super()
    this.name = 'invites'
    this.description = 'sends out evan.network mass invites from an email list'
    this.example = 'actionhero invites <email-list-file>'
    this.inputs = {
      from: {
        required: true,
        default: api.config.smartAgentOnboarding.mailOptions.from,
        note: 'sender mail address'
      },
      alias: {
        required: true,
        default: 'thomas.herbst@contractus.com',
        note: 'sender mail alias'
      },
      list: {
        required: true,
        default: 'emails.txt',
        note: 'the file to read email addresses from'
      },
      subject: {
        required: true,
        default: 'Einladung ins evan.network',
        note: 'the file to read email addresses from'
      },
      text: {
        required: true,
        default: 'Sie wurden in das evan.network eingeladen.',
        note: 'The invitation text in the email.'
      },
      eth: {
        required: true,
        default: '5',
        note: 'the amount of ether to send with each invite'
      },
      lang: {
        required: true,
        default: 'de',
        note: 'the language of the invite email, de/en'
      }
    }
  }

  
  async run ({params}) {

    var lines = require('readline').createInterface({
      input: require('fs').createReadStream(params.list)
    })
    var p = []
    api.log("Start Sending")
    return new Promise((resolve, reject) => {
      var recipients = []
      lines.on('line',(recipient) => {
        const addr = recipient.trim()
        if(addr.length) {
          recipients.push(addr)
        }
      })
        .on('close', () => {
          for(var i in recipients) {
            p.push(api.smartAgentOnboarding.sendInvite(params.from,
                                                       recipients[i],
                                                       params.eth, 0,
                                                       {
                                                         subject: params.subject,
                                                         lang: params.lang,
                                                         body: params.text,
                                                         fromAlias: params.alias,
                                                         to: recipients[i],
                                                       }))
          }
          Promise.all(p).then(() => { resolve();
                                      //process.exit()
                                    } )
        })
    })
  }
}


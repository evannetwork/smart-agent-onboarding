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
const fs = require('fs')

exports['default'] = {


  smartAgentOnboarding: (api) => {
    return {
      disabled: process.env.SMART_AGENT_ONBOARDING_DISABLED ?  JSON.parse(process.env.SMART_AGENT_ONBOARDING_DISABLED) : true,
      ethAccount: '0x063fB42cCe4CA5448D69b4418cb89E663E71A139',
      ignoreKeyExchange: false,
      mailOptions: {
        from: '"evan.network" <noreply@evan.network>',
        mailBody: {
          en: fs.readFileSync(__dirname + '/../node_modules/smart-agent-onboarding/templates/mail_en.html', {encoding:'utf-8'}),
          de: fs.readFileSync(__dirname + '/../node_modules/smart-agent-onboarding/templates/mail_de.html', {encoding:'utf-8'})
        }
      },
    }
  }
}

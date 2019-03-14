const fs = require('fs')

exports['default'] = {


  // makes your used evan.network accounts and private keys known to the blockchain-core
  // so the library can sign and encrypt with it.
  ethAccounts: {
    '0x063fB42cCe4CA5448D69b4418cb89E663E71A139' :
      'ccfa2077a3431de60e4cfbc05eacb0a593775f387fa7bb81ee513d7010f943f6',
  },

  // the different needed encryption keys associated with each account or account pair
  // also collected and merged in the blockchain-core library
  encryptionKeys: {

    // comm key
    //'0x063fB42cCe4CA5448D69b4418cb89E663E71A139,0x063fB42cCe4CA5448D69b4418cb89E663E71A139':
    '0x1d487a3c06016262eec39da266e690895141ddbfa4ea79b1f6649903495a2dc5':
      '346c22768f84f3050f5c94cec98349b3c5cbfa0b7315304e13647a4918ffffaa',

    // data key
    //'0x063fB42cCe4CA5448D69b4418cb89E663E71A139':
    '0xa6af00dba5f5c88b4d43f327d21c2583ba3d793c5952b9d5b9947fb6baf6201e':
      '346c22768f84f3050f5c94cec98349b3c5cbfa0b7315304e13647a4918ffffaa',
  },

  smartAgentOnboarding: (api) => {
    return {
      disabled: false,
      ethAccount: '0x063fB42cCe4CA5448D69b4418cb89E663E71A139',
      ignoreKeyExchange: false,
      mailOptions: {
        from: '"evan.network" <noreply@evan.network>',
        mailBody: {
          en: fs.readFileSync(__dirname + '/../node_modules/smart-agent-onboarding/templates/mail_en.html', {encoding:'utf-8'}),
          de: fs.readFileSync(__dirname + '/../node_modules/smart-agent-onboarding/templates/mail_de.html', {encoding:'utf-8'})
        }
      },
      mailTransportOptions: {
        auth: {
          user: 'apikey',
          pass: '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',
        },
        host: 'smtp.sendgrid.net',
        port: 587
      },
    }
  }
}

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

exports['default'] = {

  
  smartAgentOnboarding: (api) => {
    return {
      disabled: process.env.SMART_AGENT_ONBOARDING_DISABLED ?  JSON.parse(process.env.SMART_AGENT_ONBOARDING_DISABLED) : true,
      ethAccount: '0x063fB42cCe4CA5448D69b4418cb89E663E71A139',
      ignoreKeyExchange: true,
      mailOptions: {
        from: '"evan.network" <noreply@evan.network>',
        mailBody: {
          en: `
<!DOCTYPE html>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
    /* FONTS */
    @media screen {
        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 400;
          src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 700;
          src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 400;
          src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 700;
          src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
        }
    }

    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    /* MOBILE STYLES */
    @media screen and (max-width:600px){
        h1 {
            font-size: 32px !important;
            line-height: 32px !important;
        }
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>
</head>
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">

<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    You were invited to the evan.network!
</div>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
        <td bgcolor="#002746" align="center">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                        <a href="https://evan.network" target="_blank">
                            <img alt="Logo" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxODggNjIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjQxNDIxOyI+PGc+PHJlY3QgeD0iMTgxLjMxMyIgeT0iNDcuOCIgd2lkdGg9IjYuNTUyIiBoZWlnaHQ9IjYuNjU3IiBzdHlsZT0iZmlsbDojNjRjNmMxOyIvPjxwYXRoIGQ9Ik0yNy4zMzEsNy41OTZsMCw2LjcwNGwtMjAuMTE3LDBsMCwtNi43MDRsMjAuMTE3LDBabS0yNi44MjMsMjYuODJsMzMuNTI5LDBsMCwtNi43MDZsLTI2LjgyMywwbDAsLTYuNzA3bDI2LjgyMywwbDAsLTIwLjExNGwtMzMuNTI5LDBsMCwzMy41MjdaIiBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik02Ny40NzIsNy41OTRsMCwyMC4wOTVsNi43MDcsMGwwLC0yNi44MDFsLTYuNzA3LDBsMCw2LjcwNloiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTQ3LjM1NiwwLjg4OGwtNi43MDUsMGwwLDMzLjUyOGwyNi44LDBsMCwtNi43MDVsLTIwLjA5NSwwbDAsLTI2LjgyM1oiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTEyMC45MjQsMC44ODhsMCwzMy41MjhsNi43MDUsMGwwLC0yNi44MjJsMjAuMTE2LDBsMCwyNi44MjJsNi43MDcsMGwwLC0zMy41MjhsLTMzLjUyOCwwWiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNODcuNjA2LDI3LjcwOWwwLC02LjcwNGwyMC4xMTcsMGwwLDYuNzA0bC0yMC4xMTcsMFptLTYuNzA3LC0yMC4xMTVsMjYuODI0LDBsMCw2LjcwN2wtMjYuODI0LDBsMCwyMC4xMTVsMzMuNTI5LDBsMCwtMzMuNTI3bC0zMy41MjksMGwwLDYuNzA1WiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cmVjdCB4PSI4MC44NTEiIHk9IjQ3Ljc5OSIgd2lkdGg9IjY2LjkwMyIgaGVpZ2h0PSI2LjY1OCIgc3R5bGU9ImZpbGw6IzY0YzZjMTsiLz48cmVjdCB4PSIxNDcuNzUxIiB5PSI1NC40NTUiIHdpZHRoPSIyNi45NjIiIGhlaWdodD0iNi42NTgiIHN0eWxlPSJmaWxsOiM2NGM2YzE7Ii8+PHBhdGggZD0iTTYuNjU2LDU0LjQ0OWwtMS44MTUsMGwwLC0zLjg4NmMwLC0wLjQ4MSAtMC4wODYsLTAuODQgLTAuMjU2LC0xLjA4Yy0wLjE3LC0wLjI0IC0wLjQ0MiwtMC4zNjEgLTAuODE1LC0wLjM2MWMtMC41MDgsMCAtMC44NzUsMC4xNyAtMS4xMDEsMC41MDljLTAuMjI2LDAuMzM5IC0wLjMzOSwwLjkwMiAtMC4zMzksMS42ODhsMCwzLjEzbC0xLjgxNSwwbDAsLTYuNjU0bDEuMzg2LDBsMC4yNDQsMC44NTJsMC4xMDEsMGMwLjIwMywtMC4zMjEgMC40ODEsLTAuNTY1IDAuODM3LC0wLjczYzAuMzU1LC0wLjE2NCAwLjc1OCwtMC4yNDcgMS4yMTEsLTAuMjQ3YzAuNzczLDAgMS4zNiwwLjIxIDEuNzYxLDAuNjI4YzAuNDAxLDAuNDE5IDAuNjAxLDEuMDIzIDAuNjAxLDEuODEzbDAsNC4zMzhaIiBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xNS4zMDIsNDguOTYyYy0wLjM4NSwwIC0wLjY4NywwLjEyMiAtMC45MDQsMC4zNjZjLTAuMjE5LDAuMjQ0IC0wLjM0NCwwLjU5IC0wLjM3NSwxLjAzOWwyLjU0NiwwYy0wLjAwNywtMC40NDkgLTAuMTI1LC0wLjc5NSAtMC4zNTEsLTEuMDM5Yy0wLjIyNiwtMC4yNDQgLTAuNTMxLC0wLjM2NiAtMC45MTYsLTAuMzY2Wm0wLjI1Niw1LjYwNmMtMS4wNzIsMCAtMS45MDksLTAuMjk2IC0yLjUxMiwtMC44ODdjLTAuNjAzLC0wLjU5MSAtMC45MDQsLTEuNDI5IC0wLjkwNCwtMi41MTJjMCwtMS4xMTQgMC4yNzgsLTEuOTc2IDAuODM2LC0yLjU4NWMwLjU1NywtMC42MDkgMS4zMjgsLTAuOTE0IDIuMzEyLC0wLjkxNGMwLjk0LDAgMS42NzIsMC4yNjggMi4xOTYsMC44MDRjMC41MjMsMC41MzUgMC43ODYsMS4yNzUgMC43ODYsMi4yMmwwLDAuODgxbC00LjI5MSwwYzAuMDIsMC41MTUgMC4xNzIsMC45MTggMC40NTgsMS4yMDhjMC4yODYsMC4yODkgMC42ODYsMC40MzQgMS4yMDIsMC40MzRjMC40MDEsMCAwLjc3OSwtMC4wNDIgMS4xMzcsLTAuMTI1YzAuMzU3LC0wLjA4NCAwLjczLC0wLjIxNyAxLjExOSwtMC4zOTlsMCwxLjQwNWMtMC4zMTgsMC4xNTggLTAuNjU3LDAuMjc2IC0xLjAxOCwwLjM1NGMtMC4zNjEsMC4wNzcgLTAuODAxLDAuMTE2IC0xLjMyMSwwLjExNloiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTI2LjU3Miw1My4xMjFjMC4zMTcsMCAwLjY5OCwtMC4wNjkgMS4xNDMsLTAuMjA4bDAsMS4zNTFjLTAuNDUzLDAuMjAyIC0xLjAwOCwwLjMwNCAtMS42NjcsMC4zMDRjLTAuNzI2LDAgLTEuMjU0LC0wLjE4NCAtMS41ODYsLTAuNTUxYy0wLjMzMSwtMC4zNjYgLTAuNDk3LC0wLjkxNyAtMC40OTcsLTEuNjUxbDAsLTMuMjA3bC0wLjg2OCwwbDAsLTAuNzY4bDAuOTk5LC0wLjYwN2wwLjUyNCwtMS40MDVsMS4xNjEsMGwwLDEuNDE2bDEuODYyLDBsMCwxLjM2NGwtMS44NjIsMGwwLDMuMjA3YzAsMC4yNTcgMC4wNzIsMC40NDggMC4yMTcsMC41NzFjMC4xNDUsMC4xMjMgMC4zMzYsMC4xODQgMC41NzQsMC4xODRaIiBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0zOC41NSw1NC40NDlsLTAuNTExLC0yLjMyOGwtMC42OTEsLTIuOTM5bC0wLjA0MSwwbC0xLjIxNCw1LjI2N2wtMS45NTIsMGwtMS44OTMsLTYuNjU0bDEuODEsMGwwLjc2NywyLjk0N2MwLjEyMywwLjUyNyAwLjI0OCwxLjI1NCAwLjM3NSwyLjE4M2wwLjAzNiwwYzAuMDE2LC0wLjMwMiAwLjA4NSwtMC43NzkgMC4yMDgsLTEuNDM0bDAuMDk1LC0wLjUwNmwwLjgyMSwtMy4xOWwyLDBsMC43OCwzLjE5YzAuMDE1LDAuMDg4IDAuMDQsMC4yMTcgMC4wNzQsMC4zODdjMC4wMzQsMC4xNyAwLjA2NiwwLjM1MiAwLjA5OCwwLjU0NGMwLjAzMiwwLjE5MyAwLjA2MSwwLjM4MSAwLjA4NiwwLjU2NmMwLjAyNiwwLjE4NCAwLjA0MSwwLjMzMiAwLjA0NSwwLjQ0M2wwLjAzNiwwYzAuMDM2LC0wLjI4NSAwLjA5OSwtMC42NzggMC4xOSwtMS4xNzVjMC4wOTEsLTAuNDk4IDAuMTU3LC0wLjgzNSAwLjE5NywtMS4wMDhsMC43OTcsLTIuOTQ3bDEuNzc5LDBsLTEuOTE2LDYuNjU0bC0xLjk3NiwwWiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNNDguOTgxLDUxLjExYzAsMC42NTkgMC4xMDksMS4xNTcgMC4zMjUsMS40OTRjMC4yMTYsMC4zMzcgMC41NjgsMC41MDYgMS4wNTYsMC41MDZjMC40ODQsMCAwLjgzMiwtMC4xNjggMS4wNDUsLTAuNTAzYzAuMjEyLC0wLjMzNSAwLjMxOCwtMC44MzQgMC4zMTgsLTEuNDk3YzAsLTAuNjU4IC0wLjEwNywtMS4xNTMgLTAuMzIxLC0xLjQ4MmMtMC4yMTQsLTAuMzI5IC0wLjU2NiwtMC40OTQgLTEuMDU0LC0wLjQ5NGMtMC40ODQsMCAtMC44MzMsMC4xNjQgLTEuMDQ3LDAuNDkxYy0wLjIxNCwwLjMyOCAtMC4zMjIsMC44MjMgLTAuMzIyLDEuNDg1Wm00LjYwMSwwYzAsMS4wODQgLTAuMjg2LDEuOTMgLTAuODU3LDIuNTQyYy0wLjU3MiwwLjYxIC0xLjM2NywwLjkxNiAtMi4zODcsMC45MTZjLTAuNjM4LDAgLTEuMjAyLC0wLjE0IC0xLjY5LC0wLjQyYy0wLjQ4OCwtMC4yNzkgLTAuODYzLC0wLjY4MSAtMS4xMjUsLTEuMjA1Yy0wLjI2MSwtMC41MjQgLTAuMzkyLC0xLjEzNSAtMC4zOTIsLTEuODMzYzAsLTEuMDg3IDAuMjg0LC0xLjkzMiAwLjg1MSwtMi41MzVjMC41NjcsLTAuNjAzIDEuMzY1LC0wLjkwNSAyLjM5MiwtMC45MDVjMC42MzksMCAxLjIwMiwwLjEzOSAxLjY5LDAuNDE3YzAuNDg4LDAuMjc4IDAuODYzLDAuNjc2IDEuMTI1LDEuMTk3YzAuMjYyLDAuNTE5IDAuMzkzLDEuMTI4IDAuMzkzLDEuODI2WiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNNjIuODE2LDQ3LjY3YzAuMjQ3LDAgMC40NTEsMC4wMTkgMC42MTQsMC4wNTRsLTAuMTM3LDEuNzAyYy0wLjE0NywtMC4wNCAtMC4zMjYsLTAuMDU5IC0wLjUzNiwtMC4wNTljLTAuNTc5LDAgLTEuMDMsMC4xNDggLTEuMzU0LDAuNDQ2Yy0wLjMyMywwLjI5OCAtMC40ODQsMC43MTQgLTAuNDg0LDEuMjVsMCwzLjM4NmwtMS44MTYsMGwwLC02LjY1NGwxLjM3NSwwbDAuMjY4LDEuMTE5bDAuMDg5LDBjMC4yMDcsLTAuMzczIDAuNDg1LC0wLjY3MyAwLjgzNiwtMC45MDFjMC4zNTEsLTAuMjI4IDAuNzMzLC0wLjM0MyAxLjE0NSwtMC4zNDNaIiBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik03MC40MDQsNTAuODNsMC43OTEsLTEuMDExbDEuODYzLC0yLjAyNGwyLjA0NywwbC0yLjY0MiwyLjg4N2wyLjgwMywzLjc2N2wtMi4wOTUsMGwtMS45MTYsLTIuNjk2bC0wLjc4LDAuNjI0bDAsMi4wNzJsLTEuODE1LDBsMCwtOS4yNmwxLjgxNSwwbDAsNC4xM2wtMC4wOTUsMS41MTFsMC4wMjQsMFoiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PC9nPjwvc3ZnPg==" width="300" height="80" style="display: block; width: 40px; max-width: 300px; min-width: 300px; font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
                        </a>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- HERO -->
    <tr>
        <td bgcolor="#002746" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                      <h1 style="font-size: 48px; font-weight: 400; margin: 0;">Welcome!</h1>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- COPY BLOCK -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;">You were invited to the EVAN.network from <%- inviteeAlias %>. The User sent the following message: </p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;"><%- inviteMail %></p>
                </td>
              </tr>
              <!-- BULLETPROOF BUTTON -->
              <tr>
                <td bgcolor="#ffffff" align="left">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                        <table border="0" cellspacing="0" cellpadding="0">
                          <tr>
                              <td align="center" style="border-radius: 3px;" bgcolor="#002746"><a href="https://dashboard.evan.network/#/onboarding.evan?onboardingID=<%- sessionId %>&inviteeAddress=<%- inviteeAddress %>&inviteeAlias=<%- inviteeAlias %>&eveAmount=<%- eveAmount %>&email=<%- targetMail %>" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #002746; display: inline-block;">Accept invitation</a></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                </td>
              </tr>
              <!-- COPY -->
                <tr>
                  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <p style="margin: 0;"><a href="https://dashboard.evan.network/#/onboarding.evan?onboardingID=<%- sessionId %>&inviteeAddress=<%- inviteeAddress %>&inviteeAlias=<%- inviteeAlias %>&eveAmount=<%- eveAmount %>&email=<%- targetMail %>" target="_blank" style="color: #002746;">Click here</a></p>
                  </td>
                </tr>
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;">Cheers,<br>The evan.network Team</p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- FOOTER -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
              <!-- ADDRESS -->
              <tr>
                <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                  <p style="margin: 0;">evan.network  - Antonstrasse 3a - Dresden - 01097</p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
</table>

</body>
</html>`,
          de:`
<!DOCTYPE html>
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
<style type="text/css">
    /* FONTS */
    @media screen {
        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 400;
          src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: normal;
          font-weight: 700;
          src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 400;
          src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
        }

        @font-face {
          font-family: 'Lato';
          font-style: italic;
          font-weight: 700;
          src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
        }
    }

    /* CLIENT-SPECIFIC STYLES */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; }

    /* RESET STYLES */
    img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    table { border-collapse: collapse !important; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }

    /* iOS BLUE LINKS */
    a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
    }

    /* MOBILE STYLES */
    @media screen and (max-width:600px){
        h1 {
            font-size: 32px !important;
            line-height: 32px !important;
        }
    }

    /* ANDROID CENTER FIX */
    div[style*="margin: 16px 0;"] { margin: 0 !important; }
</style>
</head>
<body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">

<!-- HIDDEN PREHEADER TEXT -->
<div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Sie wurden zum evan.network eingeladen!
</div>

<table border="0" cellpadding="0" cellspacing="0" width="100%">
    <!-- LOGO -->
    <tr>
        <td bgcolor="#002746" align="center">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td align="center" valign="top" style="padding: 40px 10px 40px 10px;">
                        <a href="https://evan.network" target="_blank">
                            <img alt="Logo" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxODggNjIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM6c2VyaWY9Imh0dHA6Ly93d3cuc2VyaWYuY29tLyIgc3R5bGU9ImZpbGwtcnVsZTpldmVub2RkO2NsaXAtcnVsZTpldmVub2RkO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxLjQxNDIxOyI+PGc+PHJlY3QgeD0iMTgxLjMxMyIgeT0iNDcuOCIgd2lkdGg9IjYuNTUyIiBoZWlnaHQ9IjYuNjU3IiBzdHlsZT0iZmlsbDojNjRjNmMxOyIvPjxwYXRoIGQ9Ik0yNy4zMzEsNy41OTZsMCw2LjcwNGwtMjAuMTE3LDBsMCwtNi43MDRsMjAuMTE3LDBabS0yNi44MjMsMjYuODJsMzMuNTI5LDBsMCwtNi43MDZsLTI2LjgyMywwbDAsLTYuNzA3bDI2LjgyMywwbDAsLTIwLjExNGwtMzMuNTI5LDBsMCwzMy41MjdaIiBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik02Ny40NzIsNy41OTRsMCwyMC4wOTVsNi43MDcsMGwwLC0yNi44MDFsLTYuNzA3LDBsMCw2LjcwNloiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTQ3LjM1NiwwLjg4OGwtNi43MDUsMGwwLDMzLjUyOGwyNi44LDBsMCwtNi43MDVsLTIwLjA5NSwwbDAsLTI2LjgyM1oiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTEyMC45MjQsMC44ODhsMCwzMy41MjhsNi43MDUsMGwwLC0yNi44MjJsMjAuMTE2LDBsMCwyNi44MjJsNi43MDcsMGwwLC0zMy41MjhsLTMzLjUyOCwwWiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNODcuNjA2LDI3LjcwOWwwLC02LjcwNGwyMC4xMTcsMGwwLDYuNzA0bC0yMC4xMTcsMFptLTYuNzA3LC0yMC4xMTVsMjYuODI0LDBsMCw2LjcwN2wtMjYuODI0LDBsMCwyMC4xMTVsMzMuNTI5LDBsMCwtMzMuNTI3bC0zMy41MjksMGwwLDYuNzA1WiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cmVjdCB4PSI4MC44NTEiIHk9IjQ3Ljc5OSIgd2lkdGg9IjY2LjkwMyIgaGVpZ2h0PSI2LjY1OCIgc3R5bGU9ImZpbGw6IzY0YzZjMTsiLz48cmVjdCB4PSIxNDcuNzUxIiB5PSI1NC40NTUiIHdpZHRoPSIyNi45NjIiIGhlaWdodD0iNi42NTgiIHN0eWxlPSJmaWxsOiM2NGM2YzE7Ii8+PHBhdGggZD0iTTYuNjU2LDU0LjQ0OWwtMS44MTUsMGwwLC0zLjg4NmMwLC0wLjQ4MSAtMC4wODYsLTAuODQgLTAuMjU2LC0xLjA4Yy0wLjE3LC0wLjI0IC0wLjQ0MiwtMC4zNjEgLTAuODE1LC0wLjM2MWMtMC41MDgsMCAtMC44NzUsMC4xNyAtMS4xMDEsMC41MDljLTAuMjI2LDAuMzM5IC0wLjMzOSwwLjkwMiAtMC4zMzksMS42ODhsMCwzLjEzbC0xLjgxNSwwbDAsLTYuNjU0bDEuMzg2LDBsMC4yNDQsMC44NTJsMC4xMDEsMGMwLjIwMywtMC4zMjEgMC40ODEsLTAuNTY1IDAuODM3LC0wLjczYzAuMzU1LC0wLjE2NCAwLjc1OCwtMC4yNDcgMS4yMTEsLTAuMjQ3YzAuNzczLDAgMS4zNiwwLjIxIDEuNzYxLDAuNjI4YzAuNDAxLDAuNDE5IDAuNjAxLDEuMDIzIDAuNjAxLDEuODEzbDAsNC4zMzhaIiBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0xNS4zMDIsNDguOTYyYy0wLjM4NSwwIC0wLjY4NywwLjEyMiAtMC45MDQsMC4zNjZjLTAuMjE5LDAuMjQ0IC0wLjM0NCwwLjU5IC0wLjM3NSwxLjAzOWwyLjU0NiwwYy0wLjAwNywtMC40NDkgLTAuMTI1LC0wLjc5NSAtMC4zNTEsLTEuMDM5Yy0wLjIyNiwtMC4yNDQgLTAuNTMxLC0wLjM2NiAtMC45MTYsLTAuMzY2Wm0wLjI1Niw1LjYwNmMtMS4wNzIsMCAtMS45MDksLTAuMjk2IC0yLjUxMiwtMC44ODdjLTAuNjAzLC0wLjU5MSAtMC45MDQsLTEuNDI5IC0wLjkwNCwtMi41MTJjMCwtMS4xMTQgMC4yNzgsLTEuOTc2IDAuODM2LC0yLjU4NWMwLjU1NywtMC42MDkgMS4zMjgsLTAuOTE0IDIuMzEyLC0wLjkxNGMwLjk0LDAgMS42NzIsMC4yNjggMi4xOTYsMC44MDRjMC41MjMsMC41MzUgMC43ODYsMS4yNzUgMC43ODYsMi4yMmwwLDAuODgxbC00LjI5MSwwYzAuMDIsMC41MTUgMC4xNzIsMC45MTggMC40NTgsMS4yMDhjMC4yODYsMC4yODkgMC42ODYsMC40MzQgMS4yMDIsMC40MzRjMC40MDEsMCAwLjc3OSwtMC4wNDIgMS4xMzcsLTAuMTI1YzAuMzU3LC0wLjA4NCAwLjczLC0wLjIxNyAxLjExOSwtMC4zOTlsMCwxLjQwNWMtMC4zMTgsMC4xNTggLTAuNjU3LDAuMjc2IC0xLjAxOCwwLjM1NGMtMC4zNjEsMC4wNzcgLTAuODAxLDAuMTE2IC0xLjMyMSwwLjExNloiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PHBhdGggZD0iTTI2LjU3Miw1My4xMjFjMC4zMTcsMCAwLjY5OCwtMC4wNjkgMS4xNDMsLTAuMjA4bDAsMS4zNTFjLTAuNDUzLDAuMjAyIC0xLjAwOCwwLjMwNCAtMS42NjcsMC4zMDRjLTAuNzI2LDAgLTEuMjU0LC0wLjE4NCAtMS41ODYsLTAuNTUxYy0wLjMzMSwtMC4zNjYgLTAuNDk3LC0wLjkxNyAtMC40OTcsLTEuNjUxbDAsLTMuMjA3bC0wLjg2OCwwbDAsLTAuNzY4bDAuOTk5LC0wLjYwN2wwLjUyNCwtMS40MDVsMS4xNjEsMGwwLDEuNDE2bDEuODYyLDBsMCwxLjM2NGwtMS44NjIsMGwwLDMuMjA3YzAsMC4yNTcgMC4wNzIsMC40NDggMC4yMTcsMC41NzFjMC4xNDUsMC4xMjMgMC4zMzYsMC4xODQgMC41NzQsMC4xODRaIiBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik0zOC41NSw1NC40NDlsLTAuNTExLC0yLjMyOGwtMC42OTEsLTIuOTM5bC0wLjA0MSwwbC0xLjIxNCw1LjI2N2wtMS45NTIsMGwtMS44OTMsLTYuNjU0bDEuODEsMGwwLjc2NywyLjk0N2MwLjEyMywwLjUyNyAwLjI0OCwxLjI1NCAwLjM3NSwyLjE4M2wwLjAzNiwwYzAuMDE2LC0wLjMwMiAwLjA4NSwtMC43NzkgMC4yMDgsLTEuNDM0bDAuMDk1LC0wLjUwNmwwLjgyMSwtMy4xOWwyLDBsMC43OCwzLjE5YzAuMDE1LDAuMDg4IDAuMDQsMC4yMTcgMC4wNzQsMC4zODdjMC4wMzQsMC4xNyAwLjA2NiwwLjM1MiAwLjA5OCwwLjU0NGMwLjAzMiwwLjE5MyAwLjA2MSwwLjM4MSAwLjA4NiwwLjU2NmMwLjAyNiwwLjE4NCAwLjA0MSwwLjMzMiAwLjA0NSwwLjQ0M2wwLjAzNiwwYzAuMDM2LC0wLjI4NSAwLjA5OSwtMC42NzggMC4xOSwtMS4xNzVjMC4wOTEsLTAuNDk4IDAuMTU3LC0wLjgzNSAwLjE5NywtMS4wMDhsMC43OTcsLTIuOTQ3bDEuNzc5LDBsLTEuOTE2LDYuNjU0bC0xLjk3NiwwWiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNNDguOTgxLDUxLjExYzAsMC42NTkgMC4xMDksMS4xNTcgMC4zMjUsMS40OTRjMC4yMTYsMC4zMzcgMC41NjgsMC41MDYgMS4wNTYsMC41MDZjMC40ODQsMCAwLjgzMiwtMC4xNjggMS4wNDUsLTAuNTAzYzAuMjEyLC0wLjMzNSAwLjMxOCwtMC44MzQgMC4zMTgsLTEuNDk3YzAsLTAuNjU4IC0wLjEwNywtMS4xNTMgLTAuMzIxLC0xLjQ4MmMtMC4yMTQsLTAuMzI5IC0wLjU2NiwtMC40OTQgLTEuMDU0LC0wLjQ5NGMtMC40ODQsMCAtMC44MzMsMC4xNjQgLTEuMDQ3LDAuNDkxYy0wLjIxNCwwLjMyOCAtMC4zMjIsMC44MjMgLTAuMzIyLDEuNDg1Wm00LjYwMSwwYzAsMS4wODQgLTAuMjg2LDEuOTMgLTAuODU3LDIuNTQyYy0wLjU3MiwwLjYxIC0xLjM2NywwLjkxNiAtMi4zODcsMC45MTZjLTAuNjM4LDAgLTEuMjAyLC0wLjE0IC0xLjY5LC0wLjQyYy0wLjQ4OCwtMC4yNzkgLTAuODYzLC0wLjY4MSAtMS4xMjUsLTEuMjA1Yy0wLjI2MSwtMC41MjQgLTAuMzkyLC0xLjEzNSAtMC4zOTIsLTEuODMzYzAsLTEuMDg3IDAuMjg0LC0xLjkzMiAwLjg1MSwtMi41MzVjMC41NjcsLTAuNjAzIDEuMzY1LC0wLjkwNSAyLjM5MiwtMC45MDVjMC42MzksMCAxLjIwMiwwLjEzOSAxLjY5LDAuNDE3YzAuNDg4LDAuMjc4IDAuODYzLDAuNjc2IDEuMTI1LDEuMTk3YzAuMjYyLDAuNTE5IDAuMzkzLDEuMTI4IDAuMzkzLDEuODI2WiIgc3R5bGU9ImZpbGw6I2ZmZjtmaWxsLXJ1bGU6bm9uemVybzsiLz48cGF0aCBkPSJNNjIuODE2LDQ3LjY3YzAuMjQ3LDAgMC40NTEsMC4wMTkgMC42MTQsMC4wNTRsLTAuMTM3LDEuNzAyYy0wLjE0NywtMC4wNCAtMC4zMjYsLTAuMDU5IC0wLjUzNiwtMC4wNTljLTAuNTc5LDAgLTEuMDMsMC4xNDggLTEuMzU0LDAuNDQ2Yy0wLjMyMywwLjI5OCAtMC40ODQsMC43MTQgLTAuNDg0LDEuMjVsMCwzLjM4NmwtMS44MTYsMGwwLC02LjY1NGwxLjM3NSwwbDAuMjY4LDEuMTE5bDAuMDg5LDBjMC4yMDcsLTAuMzczIDAuNDg1LC0wLjY3MyAwLjgzNiwtMC45MDFjMC4zNTEsLTAuMjI4IDAuNzMzLC0wLjM0MyAxLjE0NSwtMC4zNDNaIiBzdHlsZT0iZmlsbDojZmZmO2ZpbGwtcnVsZTpub256ZXJvOyIvPjxwYXRoIGQ9Ik03MC40MDQsNTAuODNsMC43OTEsLTEuMDExbDEuODYzLC0yLjAyNGwyLjA0NywwbC0yLjY0MiwyLjg4N2wyLjgwMywzLjc2N2wtMi4wOTUsMGwtMS45MTYsLTIuNjk2bC0wLjc4LDAuNjI0bDAsMi4wNzJsLTEuODE1LDBsMCwtOS4yNmwxLjgxNSwwbDAsNC4xM2wtMC4wOTUsMS41MTFsMC4wMjQsMFoiIHN0eWxlPSJmaWxsOiNmZmY7ZmlsbC1ydWxlOm5vbnplcm87Ii8+PC9nPjwvc3ZnPg==" width="300" height="80" style="display: block; width: 40px; max-width: 300px; min-width: 300px; font-family: 'Lato', Helvetica, Arial, sans-serif; color: #ffffff; font-size: 18px;" border="0">
                        </a>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- HERO -->
    <tr>
        <td bgcolor="#002746" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                <tr>
                    <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                      <h1 style="font-size: 48px; font-weight: 400; margin: 0;">Willkommen!</h1>
                    </td>
                </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- COPY BLOCK -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;">Sie wurden von <%- inviteeAlias %> zum evan.network eingeladen. Es wurde folgende Nachricht übermittelt: </p>
                </td>
              </tr>
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;"><%- inviteMail %></p>
                </td>
              </tr>
              <!-- BULLETPROOF BUTTON -->
              <tr>
                <td bgcolor="#ffffff" align="left">
                  <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                        <table border="0" cellspacing="0" cellpadding="0">
                          <tr>
                              <td align="center" style="border-radius: 3px;" bgcolor="#002746"><a href="https://dashboard.evan.network/#/onboarding.evan?onboardingID=<%- sessionId %>&inviteeAddress=<%- inviteeAddress %>&inviteeAlias=<%- inviteeAlias %>&eveAmount=<%- eveAmount %>&email=<%- targetMail %>" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #002746; display: inline-block;">Einladung annehmen</a></td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;">Wenn es nicht funktioniert, kopiere bitte folgende URL in deinen Browser:</p>
                </td>
              </tr>
              <!-- COPY -->
                <tr>
                  <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                    <p style="margin: 0;"><a href="https://dashboard.evan.network/#/onboarding.evan?onboardingID=<%- sessionId %>&inviteeAddress=<%- inviteeAddress %>&inviteeAlias=<%- inviteeAlias %>&eveAmount=<%- eveAmount %>&email=<%- targetMail %>" target="_blank" style="color: #002746;">Hier klicken</a></p>
                  </td>
                </tr>
              <!-- COPY -->
              <tr>
                <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;" >
                  <p style="margin: 0;">Viele Grüße,<br>das evan.network Team</p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
    <!-- FOOTER -->
    <tr>
        <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
            <!--[if (gte mso 9)|(IE)]>
            <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
            <tr>
            <td align="center" valign="top" width="600">
            <![endif]-->
            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
              <!-- ADDRESS -->
              <tr>
                <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                  <p style="margin: 0;">evan.network  - Antonstrasse 3a - Dresden - 01097</p>
                </td>
              </tr>
            </table>
            <!--[if (gte mso 9)|(IE)]>
            </td>
            </tr>
            </table>
            <![endif]-->
        </td>
    </tr>
</table>

</body>
</html>`
        }
      },
    }
  }
}

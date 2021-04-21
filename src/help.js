const chalk = require('chalk');

module.exports = () => {
    const ascii = `

         ████
        ██  ██                 ▄▄     ▄▄▄▄                    ▄▄▄▄     ██
       ██    ██                ██      ▀██                    ▀▀██     ▀▀
      ██      ██       ▄█████▄ ██▄███▄  ██ ▀██  ███     ▄█████▄ ██   ████
     ██        ██      ▀ ▄▄▄██ ██▀  ▀██ ██  ██▄ ██     ██▀    ▀ ██     ██
    ██   ████   ██    ▄██▀▀▀██ ██    ██ ██   ████▀ ███ ██       ██     ██
   ██  ███  ███  ██   ██▄▄▄███ ███▄▄██▀ ██▄▄▄ ███      ▀██▄▄▄▄█ ██▄▄ ▄▄██▄
  █████        █████   ▀▀▀▀ ▀▀ ▀▀ ▀▀▀    ▀▀▀▀ ██         ▀▀▀▀▀   ▀▀▀ ▀▀▀▀▀
 ███              ███                       ███

 We're looking for great people to join us. See https://ably.com/careers

 ###  Keyboard shortcuts:

 - a  Attach to a channel
 - d  Detach from channel
 - m  Publish a message
 - e  Enter presence
 - l  Leave presence
 - q  Quit
`
    // Turn the ably logo red
    const colorAscii = ascii.split('\n').map((line , lineNo) => line.split('').map((char, index) => ((index > 20 || lineNo > 10) ? char : chalk.bold.red(char))).join('')).join('\n');
    return colorAscii;
}

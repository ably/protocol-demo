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

 ###  basic commands:

 - attach <channelName> -- attach to a channel
 - dettach <channelName> -- detach from a channel
 - publish [-e <eventName>] <channelName> <data> -- publish a message on a channel
 - presence <action> <channelName> -- enter or leave channel presence
 - exit -- exit the ably-cli
 - help -- show the full list of commands

`
    // Turn the ably logo red
    const colorAscii = ascii.split('\n').map((line , lineNo) => line.split('').map((char, index) => ((index > 20 || lineNo > 10) ? char : chalk.bold.red(char))).join('')).join('\n');
    return colorAscii;
}

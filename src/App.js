const WebSocket = require('ws');
const format = require('date-fns/format')
const readline = require('readline');
const inquirer = require('inquirer');
const chalk = require('chalk');
const protocolActions = require('./protocolActions');
const Ably = require('./Ably');

class App {
    constructor(options) {
        // Set up the console to listen to key events
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', this.onKeypress);

        // Clear the console
        console.clear();
        console.log(options);

        this.ably = new Ably(options);
        this.ably.listen(this.onMessageRecieved);
        this.channels = [];
        this.askingQuestion = false;
        this.lastRecievedMessage = null;
    }

    ask = async (question) => {
        this.askingQuestion = true;
        const result = await inquirer.prompt(question);

        // Set up the console to start listening to key events again
        process.stdin.setRawMode(true);
        process.stdin.resume();
        this.askingQuestion = false;

        return result[question.name];
    }

    logAction = (name, color, append) => {
        console.log(`${format(new Date(), 'HH:mm:ss')} ${color(name)} ${append ?? ''}`);
    }

    onKeypress = async (_, key) => {
        // Dont register keypresses if we're asking a question
        if (!this.askingQuestion) {
            switch (key.sequence) {
                // Quit
                case 'q':
                    process.exit();
                // Attach
                case 'a': {
                    const channelName = await this.ask({ type: 'input', name: 'channel', message: 'enter channel name'});
                    const channel = this.ably.getChannel(channelName);
                    channel.attach();
                    this.channels.push(channel);
                    break;
                }
                // Detach
                case 'd': {
                    if (this.channels.length === 0) {
                        console.error('Not attached to any channels');
                        return;
                    }
                    const channelName = await this.ask({ type: 'list', name: 'channel', message: 'which channel would you like to detach from?', choices: this.channels.map(channel => channel.name)});
                    const channel = this.channels.find(channel => channel.name === channelName);
                    channel.detach();
                    break;
                }
                // Message (publish message)
                case 'm': {
                    if (this.channels.length === 0) {
                        console.error('Not attached to any channels');
                        return;
                    }

                    const channelName = await this.ask({ type: 'list', name: 'channel', message: 'which channel would you like to publish to?', choices: this.channels.map(channel => channel.name)});
                    const string = await this.ask({ type: 'input', name: "data", message: `enter data to send to ${channelName}`});
                    const channel = this.channels.find(channel => channel.name === channelName);
                    channel.publish(string);
                    break;
                }
                // Message (re-play last message)
                case 'r': {
                    const string = this.lastRecievedMessage || null;
                    if(!string) break;

                    const channelName = await this.ask({ type: 'list', name: 'channel', message: 'which channel would you like to publish to?', choices: this.channels.map(channel => channel.name)});
                    const channel = this.channels.find(channel => channel.name === channelName);
                    const data = /^{/.test(string) ? JSON.parse(string) : string;

                    channel.publish(data);
                    break;
                }
                // Message (event name)
                case 'n': {
                    const eventName = await this.ask({type: 'input', name: "event name", message: "enter default event name"});
                    this.eventName = eventName || "data";
                    break;
                }
                // Enter presence
                case 'e': {
                    if (this.channels.length === 0) {
                        console.error('Not attached to any channels');
                        return;
                    }
                    const channelName = await this.ask({ type: 'list', name: 'channel', message: 'which channel would you like to enter?', choices: this.channels.map(channel => channel.name)});
                    const channel = this.channels.find(channel => channel.name === channelName);
                    channel.enterPresence();
                    break;
                }
                // Leave presence
                case 'l': {
                    if (this.channels.length === 0) {
                        console.error('Not attached to any channels');
                        return;
                    }
                    const channelName = await this.ask({ type: 'list', name: 'channel', message: 'which channel would you like to leave?', choices: this.channels.map(channel => channel.name)});
                    const channel = this.channels.find(channel => channel.name === channelName);
                    channel.leavePresence();
                    break;
                }
                default:
                    break;
            }
        }
    }

    onMessageRecieved = (message) => {
        switch (protocolActions[message.action]) {
            case 'HEARTBEAT':
                this.logAction(' HEARTBEAT ', chalk.bgGrey.bold);
                break;
            case 'ACK':
                this.logAction(' ACK ', chalk.bgCyan.bold, `msgSerial: ${message.msgSerial}`);
                break;
            case 'NACK':
                this.logAction(' NACK ', chalk.bgRed.bold);
                console.log(message);
                break;
            case 'CONNECTED':
                this.logAction(' CONNECTED ', chalk.bgGreen.bold, `clientId: ${message.connectionDetails.clientId}`);
                break;
            case 'CLOSED':
                this.logAction(' CLOSED ', chalk.bgGray.bold);
                process.exit();
            case 'ERROR':
                this.logAction(' ERROR ', chalk.bgRed.bold);
                console.log(message);
                break;
            case 'ATTACHED':
                this.logAction(' ATTACHED ', chalk.bgMagenta.bold, `to ${chalk.magenta(message.channel)}`);
                break;
            case 'DETACHED':
                this.channels = this.channels.filter(channel => channel.name !== message.channel);
                this.logAction(' DETACHED ', chalk.bgYellow.bold, `from ${message.channel}`);
                break;
            case 'PRESENCE':
                this.onPresence(message);
                break;
            case 'MESSAGE':
                message.messages.forEach(msg => {
                    this.lastRecievedMessage = msg.data;
                    if (msg.clientId) {
                        this.logAction(' MESSAGE ', chalk.bgCyan.bold, `from ${chalk.blue(msg.clientId)} on ${chalk.magenta(message.channel)}: "${msg.data}"`);
                        return;
                    }
                    this.logAction(' MESSAGE ', chalk.bgCyan.bold, `from ${chalk.magenta(message.channel)}: "${msg.data}"`);
                });
                break;
            case 'SYNC':
                this.onPresence(message);
                break;
            default:
                console.error('unrecognised action: ' + message.action);
                console.log(message);
                break;
        }
    }

    onPresence = (message) => {
        message.presence.forEach(presenceMessage => {
            switch (presenceMessage.action) {
                // PRESENT
                case 1:
                    this.logAction(' PRESENCE ', chalk.bgBlue.bold, `${chalk.blue(presenceMessage.clientId)} is present on ${chalk.magenta(message.channel)}`);
                    break;
                // ENTER
                case 2:
                    this.logAction(' PRESENCE ', chalk.bgBlue.bold, `${chalk.blue(presenceMessage.clientId)} has entered ${chalk.magenta(message.channel)}`);
                    break;
                // LEAVE
                case 3:
                    this.logAction(' PRESENCE ', chalk.bgBlue.bold, `${chalk.blue(presenceMessage.clientId)} has left ${chalk.magenta(message.channel)}`);
                    break;
                // UPDATE
                case 4:
                    this.logAction(' PRESENCE ', chalk.bgBlue.bold, `${chalk.blue(presenceMessage.clientId)} has updated their presence on ${chalk.magenta(message.channel)}`);
                    break;
                default:
                    console.error(`unrecognised presence action: ${presenceMessage.action}`);
                    console.log(message);
                    break;
            }
        });
    }
}

module.exports = App;

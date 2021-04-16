const WebSocket = require('ws');

class Ably {
    constructor(options) {
        let uri = 'wss://realtime.ably.io?';
        uri += Object.entries(options).map(([key, value]) => `${key}=${value}`).join('&');
        this.ws = new WebSocket(uri);
    }

    listen = (callback) => {
        this.ws.on('message', (msg) => {
            const message = JSON.parse(msg)
            callback(message);
        });
    }

    getChannel = (channelName) => {
        return new Channel(channelName, this);
    }

    sendProtocolMessage = (message) => {
        this.ws.send(JSON.stringify(message));
    }
}

class Channel {
    constructor(channelName, ably) {
        this.name = channelName;
        this.ably = ably;
        this.msgSerial = 0;
    }

    attach = () => {
        const message = {
            action: 10,
            channel: this.name,
        };
        this.ably.sendProtocolMessage(message);
    }

    detach = () => {
        const message = {
            action: 12,
            channel: this.name,
        };
        this.ably.sendProtocolMessage(message);
    }

    publish = (data) => {
        const message = {
            action: 15,
            channel: this.name,
            messages: [{ data }],
            msgSerial: this.msgSerial++,
        };
        this.ably.sendProtocolMessage(message);
    }

    enterPresence = () => {
        const message = {
            action: 14,
            channel: this.name,
            presence: [{ action: 2 }],
            msgSerial: this.msgSerial++,
        };
        this.ably.sendProtocolMessage(message);
    }

    leavePresence = () => {
        const message = {
            action: 14,
            channel: this.name,
            presence: [{ action: 3 }],
            msgSerial: this.msgSerial++,
        };
        this.ably.sendProtocolMessage(message);
    }
}

module.exports = Ably;

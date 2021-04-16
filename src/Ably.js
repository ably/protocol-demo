const WebSocket = require("ws");

const getWsHost = (params) => {
    let host = 'wss://realtime.ably.io?';
    host += Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');
    return host;
}

class Ably {
    constructor(options) {
        this.ws = new WebSocket(getWsHost(options));
    }

    listen = (callback) => {
       this.ws.on('message', msg => callback(JSON.parse(msg)));
    }

    getChannel = (name) => {
        return new Channel(name, this);
    }

    sendProtocolMessage = (message) => {
        this.ws.send(JSON.stringify(message));
    }
}

class Channel {
    constructor(name, ably) {
        this.name = name;
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
            msgSerial: this.msgSerial++,
            messages: [{ data }],
        };
        this.ably.sendProtocolMessage(message);
    }

    enterPresence = () => {
        const message = {
            action: 14,
            channel: this.name,
            msgSerial: this.msgSerial++,
            presence: [{ action: 2 }],
        };
        this.ably.sendProtocolMessage(message);
    }

    leavePresence = () => {
        const message = {
            action: 14,
            channel: this.name,
            msgSerial: this.msgSerial++,
            presence: [{ action: 3 }],
        };
        this.ably.sendProtocolMessage(message);
    }
}

module.exports = Ably;

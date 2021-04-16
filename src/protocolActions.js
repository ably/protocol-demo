const protocolActions = {
    0: 'HEARTBEAT',
    1: 'ACK',
    2: 'NACK',
    3: 'CONNECT',
    4: 'CONNECTED',
    5: 'DISCONNECT',
    6: 'DISCONNECTED',
    7: 'CLOSE',
    8: 'CLOSED',
    9: 'ERROR',
    10: 'ATTACH',
    11: 'ATTACHED',
    12: 'DETACH',
    13: 'DETACHED',
    14: 'PRESENCE',
    15: 'MESSAGE',
    16: 'SYNC',
    17: 'AUTH',
}

module.exports = protocolActions;

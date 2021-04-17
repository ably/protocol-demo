#!/usr/bin/env node
const { Command } = require('commander');
const path = require('path');
const App = require('./App');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const program = new Command();
program.option('-k, --key <id>', 'key');
program.option('-c, --clientId <id>', 'clientId');
program.option('--heartbeats', 'heartbeats');
program.parse();
const options = program.opts();

const params = {};
if (options.key) {
    params.key = options.key;
} else if (process.env.ABLY_API_KEY) {
    params.key = process.env.ABLY_API_KEY;
} else {
    throw new Error('No key');
}

if (options.heartbeats) {
    params.heartbeats = 'false';
} else if (process.env.HEARTBEATS) {
    params.heartbeats = process.env.HEARTBEATS;
}

if (options.clientId) {
    params.clientId = options.clientId;
} else if (process.env.CLIENTID) {
    params.clientId = process.env.CLIENTID;
}

new App(params);

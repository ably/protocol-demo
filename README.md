# Protocol Demo

### Running locally

To run locally you need NodeJS installed, it should work on all the current LTS versions of Node.

To install the dependencies run `npm install` inside the project directory.

The app needs the `ABLY_API_KEY` environment variable to be set to run. For convenience you can use place a `.env` file in the root of this project.

```bash
# .env (example)
ABLY_API_KEY=abcd.1234.ab12cd34ef56
HEARTBEATS=true
CLIENTID=spaceinvader
```

To install the app to your global `PATH` run `npm link` inside the project and then you can run the app with the `ably-cli` command. You can change the name of the command in the `bin` section of `package.json` if you want it to be called something else. If you are using a version manager such as `asdf` you may also need to reshim for this to work.

### Launching parameters:

-   `--key` (or `-k`) `ably-cli --key abcd.1234.ab12cd34ef56` (overrides environment key)
-   `--clientId` (or -c) `ably-cli -clientId "space invaders"`
-   `--heartbeats` **note** this will deactivate heartbeats

To use a temporary API key from the Presence documentation page as your `.env`:

```bash
# Ably Demo keys expire without warning every 2-4 hours
$ curl https://ably.com/documentation/realtime/presence | grep -oiP "[a-z0-9_\-]{6,}\.[a-z0-9_\-]{6,}:[\w_\-]{16,}" | head -n 1
```

### Keyboard shortcuts

 - `a`  Attach to a channel
 - `d`  Detach from channel
 - `m`  Publish a message
 - `r`  Replay last received message
 - `n`  Set message event name
 - `h`  Toggle heartbeat message
 - `e`  Enter presence
 - `l`  Leave presence
 - `?`  This help message
 - `q`  Quit

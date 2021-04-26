# Ably Realtime Protocol Demo

## Introduction

The code in this repository was presented by [Owen Pearson](https://github.com/owenpearson) during the Ably Summit week in April 2021 under the title "Using NodeJS to integrate directly with the Ably realtime service", then presented again the following week under the title "Exploring the Ably Protocol".

During Owen's summit presentation he started off by doing some initial exploration of the basics of connecting to the Realtime service using the [websocat](https://github.com/vi/websocat) command-line tool, demonstrating the basics of creating a secure WebSocket connection to the service and presenting an Ably API `key` via the URL query parameter.

Following on from that he then moved to Node.js to build out this codebase from scaffolding he had already put in place.

## Running locally

To run locally you need NodeJS installed, it should work on all the current LTS versions of Node.

To install the dependencies run `npm install` inside the project directory.

The app needs the `ABLY_API_KEY` environment variable to be set to run. For convenience you can use place a `.env` file in the root of this project with `ABLY_API_KEY=yourkey`.

To install the app to your global `PATH` run `npm link` inside the project and then you can run the app with the `ably-cli` command. You can change the name of the command in the `bin` section of `package.json` if you want it to be called something else. If you are using a version manager such as `asdf` you may also need to reshim for this to work.

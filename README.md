# Protocol Demo

## Running locally

To run locally you need NodeJS installed, it should work on all the current LTS versions of Node.

To install the dependencies run `npm install` inside the project directory.

The app needs the `ABLY_API_KEY` environment variable to be set to run. For convenience you can use place a `.env` file in the root of this project with `ABLY_API_KEY=yourkey`.

To install the app to your global `PATH` run `npm link` inside the project and then you can run the app with the `ably-cli` command. You can change the name of the command in the `bin` section of `package.json` if you want it to be called something else. If you are using a version manager such as `asdf` you may also need to reshim for this to work.

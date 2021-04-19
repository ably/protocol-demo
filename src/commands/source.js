const fs = require("fs");
const path = require("path");

module.exports = (vorpal, app) => {
    vorpal.command("source <file>", "source an ably macro").action(function(args, callback) {
        const file = fs.readFileSync(path.resolve(args.file), 'utf-8');
        const commands = file.split('\n').filter(x => x !== '');
        commands.forEach((command) => {
            vorpal.execSync(command);
        });
        callback();
    });
}

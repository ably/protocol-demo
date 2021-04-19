module.exports = (vorpal, app) => {
    vorpal.command("every <duration> <command>", "start a repeating command").action(function(args, callback) {
        const command = this.commandWrapper.command.split(' ').slice(2).join(' ');
        const duration = Number(args.duration);
        app.registerTimer(setInterval(() => vorpal.execSync(command), duration), command);
        callback();
    });
}

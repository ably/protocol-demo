module.exports = (vorpal, app) => {
    vorpal.command("after <duration> <command>", "run a command after an interval").action(function(args, callback) {
        const command = this.commandWrapper.command.split(' ').slice(2).join(' ');
        const duration = Number(args.duration);
        setTimeout(() => vorpal.execSync(command), duration);
        callback();
    });
}

module.exports = (vorpal, app) => {
    vorpal.command("cancel <id>", "cancel a timer").action(function(args, callback) {
        const id = Number(args.id);
        const timers = app.timers;
        const timer = timers.find(x =>  x.id === id);
        clearInterval(timer.timeout);
        app.timers = app.timers.filter(x => x.id !== id);
        callback();
    });
}

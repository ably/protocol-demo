module.exports = (vorpal, app) => {
    vorpal.command("timers", "list all the currently active timers").action(function(args, callback) {
        const timers = app.timers;
        timers.forEach(timer => {
            vorpal.log(`${timer.id}: ${timer.command}`);
        });
        callback();
    });
}

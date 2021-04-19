module.exports = (vorpal, app) => {
    vorpal.command("mute", "stop displaying protocol messages").action(function(args, callback) {
        app.mute();
        callback();
    });
}

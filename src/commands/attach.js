module.exports = (vorpal, app) => {
    vorpal.command("attach <channel>", "attach to a channel").action(function(args, callback) {
        const channel = app.ably.channels.get(args.channel);
        channel.attach().then(() => {
            app.channels.push(channel);
            callback?.();
            return;
        });
    });
}

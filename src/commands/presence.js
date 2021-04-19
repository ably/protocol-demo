module.exports = (vorpal, app) => {
    vorpal.command("presence <action> <channel> [clientId]", "perform a presence action").action(function(args, callback) {
        const channel = app.ably.channels.get(args.channel);
        switch (args.action) {
            case 'enter':
                channel.presence.enter();
                break;
            case 'leave':
                channel.presence.leave();
                break;
            default:
                console.error('unrecognised presence action: ' + args.action);
        }
        callback();
    });
}

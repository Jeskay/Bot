const Match = require('./gameobj/match.js');

module.exports = {
    name: "start",
    category: "games",
    description: "starts a game with another user",
    usage: "<name>",
    run: async(client, message, args)=>{
        //if(args === null)
        //    message.channel.send('You should invite someone to play with.');
        //Match.WhitePlayer = message.author.id;
        //Match.BlackPlayer = message.args;
        console.log(Match.start(client, 'white'));
        message.channel.send('Table has been created, the match has started.');
        message.channel.send(Match.showMatch());
    }
}
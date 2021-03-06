const Match = require('./gameobj/match.js');

module.exports = {
    name: "turn",
    category: "games",
    description: "makes a turn in current game",
    usage: "<firstcoord> <secondcoord>",
    run: async(client, message, args)=>{
        const firstcoord  = [Number(args[1]), args[0].charCodeAt(0) - 65];
        const secondcoord = [Number(args[3]), args[2].charCodeAt(0) - 65];
        let callback = Match.turn(firstcoord, secondcoord, message.author.id);
        if(callback != "Success"){
            message.channel.send(callback);
            return;
        }
        message.channel.send(`moving from ${firstcoord} to ${secondcoord} .`);
        if(Match.GameStatus != 'In process'){
            message.channel.send(Match.GameStatus);
            Match.stop();
        }
    }
}
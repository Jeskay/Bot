const Match       = require('./gameobj/match.js');
const {RichEmbed} = require('discord.js');
module.exports = {
    name: "invite",
    category: "games",
    description: "invites another user to ur game",
    usage: "<name>",
    run: async(client, message, args)=>{
        if(args === null)
            message.channel.send('You should invite someone to play with.');
        Match.WhitePlayer = message.author.id;
        Match.BlackPlayer = message.args;
        
    }
}
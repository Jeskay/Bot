const Match       = require('./gameobj/match.js');
const InviteList = require('./embeds/invitelist.js');
module.exports = {
    name: "accept",
    category: "games",
    description: "invites another user to ur game",
    usage: "<name>",
    run: async(client, message, args)=>{
        const oponents = InviteList.delete(message.author.id);
        if(oponents != null){
            Match.WhitePlayer = oponents.inviter;
            Match.BlackPlayer = oponents.invited;
            message.channel.send(Match.start(client, 'white'));
        }
        else
            message.channel.send("You don't have invites from other players(");
    }
}
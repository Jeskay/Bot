const InviteList = require('./embeds/invitelist.js');
const embed = require('./embeds/inviteembed.js');
module.exports = {
    name: "invite",
    category: "games",
    description: "send game invite another user",
    usage: "<name>",
    run: async(client, message, args)=>{
        const link = args[0];
        let id = link.slice(3,link.length - 1);
        if(client.fetchUser(id)){
            InviteList.add(message.author.id, id);
            message.channel.send(embed.invitation(message.author.id, id));
        }
        else{
            message.channel.send("There is no such a user in Discord.");
        }
    }
}
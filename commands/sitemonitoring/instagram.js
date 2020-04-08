const { RichEmbed } = require("discord.js");
const { stripIndents} = require("common-tags");

const fetch = require("node-fetch");

module.exports = {
    name: "instagram",
    aliases: ["insta"],
    category: "info",
    description: "searching for instagram statistics",
    usage: "<name>",
    run: async(client, message, args) => {
        const name = args.join(" ");

        if(!name)
        {
             return message.reply("You need to write a name.")
                .then(m => m.delete(5000));
        }
        const url = `http://instagram.com/${name}/?__a=1`;

        const results = await fetch(url)
        .then(url => url.json());
            
        if(!results.graphql.user.username){
            return message.reply("Couldn't find this account...")
            .then(m => m.delete(5000));
        }
        const account = results.graphql.user;
        
        console.log(account);

        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setTitle(account.full_name)
            .setURL(account.external_url_linkshimmed)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Profile information", stripIndents`**_ Username:** ${account.username}
            **_ Full name:** ${account.full_name}
            **_Boigraphy:** ${account.biography.lenght == 0 ? "none" : account.biography}
            **_ Posts:** ${account.edge_owner_to_timeline_media.count}
            **_Followers:** ${account.edge_followed_by.count}
            **_Following:** ${account.edge_follow.count}
            **_Private account:** ${account.is_private ? "Yes" : "Nope"}`);
        
            message.channel.send(embed);
    }
}
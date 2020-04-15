const {RichEmbed} = require('discord.js');

module.exports = {
    invitation(inviter, invited) {
        const embed = new RichEmbed()
        .setColor("PURPLE")
        .setFooter("Write '.accept' to accept the invitation.")
        .addField("Invitation", `<@${inviter}> invited <@${invited}> to play draughts.`);
        
        return embed;
    }
}
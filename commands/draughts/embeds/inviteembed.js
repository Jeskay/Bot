const {RichEmbed} = require('discord.js');

module.exports = {
    invitation(inviter, invited, client) {
        const embed = new RichEmbed()
        .setColor("PURPLE")
        .setTitle("Invitation")
        .addField(`${inviter}`)
    }
}
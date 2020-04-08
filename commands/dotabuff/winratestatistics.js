const needle = require('needle');
const cheerio = require('cheerio');
const tress = require('tress');
const { RichEmbed } = require("discord.js")

var Hero = function()
{
    this.name = null;
    this.win  = null;
    this.pick = null;
    this.kda  = null;
};

module.exports = {
    name: "winrate",
    aliases: ["Wr"],
    category: "info",
    description: "",
    run: async(client, message, args) =>{
        let results = [];
        const URL = `https://www.dotabuff.com/heroes/winning/`;
        var q = tress(function(url, callback){
            needle.get(url, function(err, res){
                if(err) throw err;

                var $ = cheerio.load(res.body);
                $('section article tr').each((i, content) =>{
                    var hero  = new Hero();
                    $(content).find('td').each((i, table) => {
                        switch(i)
                        {
                            case 0:
                                {
                                    hero.name = $(table).attr('data-value');
                                    break;
                               }
                            case 2:
                                {
                                    hero.win = $(table).attr('data-value');
                                    break;
                                }
                            case 3:
                                {
                                    hero.pick = $(table).attr('data-value');
                                    break;
                                }
                            case 4:
                                {
                                    hero.kda = $(table).attr('data-value');
                                    break;
                                }
                        }
                    });
                    results.push(hero);
                });
                callback();
             });
        });
        q.drain = function(){
            let embed = new RichEmbed()
            .setColor("RED")
            .setTitle("Top heroes from dotabuff");
        for(var i = 1; i < 10; i++){
            let h = results[i];
            if(h.name != null)embed.addField(h.name, 
            `win  ${h.win}%
            pick ${h.pick}%
            kda  ${h.kda}`);
        }
        message.channel.send(embed);
        }
        q.push(URL);
        
    }
}
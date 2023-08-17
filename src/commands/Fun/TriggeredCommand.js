const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class triggered extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'triggered'
    this.aliases = ['triggered', 'trigger', 'puto', 'pistola', 'raiva']
    this.category = 'Fun'
  }

  // eslint-disable-next-line no-unused-vars
  async run(message, args) {
    const gifs = ['https://media0.giphy.com/media/ZdrUuSEC0LygaFXtNT/giphy.gif', 'https://media1.tenor.com/images/9543655e42222c2ba2eea8da45e328bc/tenor.gif?itemid=5943310', 'https://thumbs.gfycat.com/CommonHarmfulBrownbear-small.gif', 'https://66.media.tumblr.com/35d648f87c0e80af73973a0663050ade/tumblr_pazkrelXO31x2mpxfo1_400.gifv'];
    const embed = new MessageEmbed()
      .setTitle(`${message.author.username} está realmente irritado(a)`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setColor(colors['default'])
      .setTimestamp();
    message.reply({ embeds: [embed] });
  }
};

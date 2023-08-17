const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class pipoca extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'popcorn'
    this.aliases = ['pipoca']
    this.category = 'Fun'
  }

  async run(message) {
    const gifs = ['https://pa1.narvii.com/6215/98d940012ad4c04307c205b528ab50d72e7c83b5_hq.gif', 'https://66.media.tumblr.com/76c5a4474ebf4ea9699a229a426e22c8/tumblr_obnnc6SoOR1t33d6lo1_500.gif', 'https://i.pinimg.com/originals/4f/21/72/4f21725fd4cf2dd41d6c713d676dba95.gif', 'https://media1.giphy.com/media/a24ifAHp2BokM/source.gif'];
    const falas = [`${message.author} **Comprou pipoca para observar o acontecido !**`, `${message.author} **foi ao cinema assistir um filme e comprou pipoca**`];
    const embed = new MessageEmbed()
      .setDescription(falas[Math.floor(Math.random() * falas.length)])
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setColor(colors['default'])
    message.reply({ embeds: [embed] });
  }
}
const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class highfive extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'highfive'
    this.aliases = ['highfive', 'tocaaqui', 'h5']
    this.category = 'Fun'
  }

  async run(message) {
    const user = message.mentions.users.first();
    const gifs = ['https://lh6.googleusercontent.com/hIRp_xCGjt6x5H5GSu9odKA9WPagzrMYPtT-Ow-Nte0AeHoMY4MUTlnxrZkJK248JAqNiBVi_9iaU3eYS2bWXtcdJFjsnrAV8i2H_iN5pjWWHDN6djKm2E-h3MQMUvM2DkoO3M7e.gif', 'https://c.tenor.com/JBBZ9mQntx8AAAAC/anime-high-five.gif', 'https://thumbs.gfycat.com/BreakableMessyHarrierhawk-size_restricted.gif'];
    const falas = [`${message.author} **Deu um HIGH-FIVE com* ${user}`];

    const embed = new MessageEmbed()
      .setDescription(falas[Math.floor(Math.random() * falas.length)])
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setColor(colors['default'])
      .setTimestamp();

    if (!user) return message.reply('Ninguém foi mencionado!')
    else
      message.reply({ embeds: [embed] });
  }
}
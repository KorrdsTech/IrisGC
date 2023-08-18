const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class dog extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'dog'
    this.aliases = ['dog']
    this.category = 'Fun'
  }

  async run(message) {
    const gifs = ['https://media3.giphy.com/media/1qTIW3DqTPwUo/giphy.gif', 'https://media3.giphy.com/media/dYGzbKNV5Fh7vQwR4B/giphy.gif', 'https://i.pinimg.com/originals/50/bb/0a/50bb0aad7cd73787d6c2a9f3ab91d49a.gif', 'https://media1.tenor.com/images/95ad8741e29f32fb15487657d4d02082/tenor.gif?itemid=13072116'];

    const embed = new MessageEmbed()
      .setTitle(`Seu doguinho 😍`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setColor(colors['default'])
      .setTimestamp(new Date())

    message.reply({ embeds: [embed] });
  }
}
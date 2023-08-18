const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class KillCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'kill'
    this.aliases = ['matar', 'kill']
    this.category = 'fun'
  }

  async run(message, args) {
    if (!message.channel.nsfw) return message.reply('<:CancelarK:673592197341249559> Este comando só pode ser executado em um canal **NSFW**')
    const slapUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if (!slapUser) return message.reply('`Mencione o usuário que deseje matar!`');

    const gifs = ['https://data.whicdn.com/images/104398900/original.gif', 'https://78.media.tumblr.com/2628ad116065497e0ddae5cc27481b38/tumblr_okg77jiBO51w264geo2_540.gif', 'http://68.media.tumblr.com/c9340ffe7bd88258ec374a9cdf571ec3/tumblr_okxuc75yRi1w0ii2ho1_400.gif', 'https://data.whicdn.com/images/231782998/original.gif', 'https://media1.tenor.com/images/25f853a32137e24b11cd13bc2142f63a/tenor.gif?itemid=7172028']

    const killEmbed = new MessageEmbed()
      .setColor(colors['default'])
      .setDescription(`:skull: ${message.author} **matou o usuário** ${message.mentions.users.first().username}`)
      .setImage(gifs[Math.floor(Math.random() * gifs.length)])
      .setFooter({ text: `Killstreak por ${message.author}`, iconURL: message.author.displayAvatarURL({ dynamic: true, size: 1024 }) })
      .setTimestamp();

    message.reply({ embeds: [killEmbed] })
  }
}
const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class Say extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'say'
    this.aliases = ['say']
    this.category = 'Misc'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const embedA = new MessageEmbed()

      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${message.author.username}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_MESSAGES`', true)
        
    if (!message.member.permissions.has('MANAGE_MESSAGES'))
      return message.reply({ embeds: [embedA] })
    const mensagem = args.join(' ')
    if (!args[0]) message.reply('Insira algum conteúdo a ser enviado')
    message.reply(`${mensagem} \n\n<:9461systemmessageuser:832746852633149460> *Mensagem executada por: ${message.author}*`)
  }
}
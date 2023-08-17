const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class strike extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'strike'
    this.aliases = ['strike']
    this.category = 'Magic'
    this.adminOnly = false
  }

  async run(message, args) {
    const staff = await this.client.database.user.getOrCreate(message.author.id)
    if (!staff.staff) {
      return message.reply('Você não pode utilizar este comando, somente os membros confiados da equipe <@&718178715426619489>')
    }
    const defina = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Configuração Incompleta (STRIKE):**', `${message.author.username}`, true)
      .setDescription('Configure da forma ensinada abaixo.') // inline false
      .addField('*Uso do comando:*', '`Punishment logs <canal>`', true)
      .addField('*Exemplo:*', '`Punishment logs #geral`', true)

    const channel = await this.client.database.guild.getOrCreate(message.guild.id)
    const log = this.client.channels.cache.get(channel.punishChannel)
    if (!log) message.reply({ embeds: [defina] })
    switch (args[0]) {
      case 'add': {
        const usuario = await this.client.users.fetch(args[1].replace(/[<@!>]/g, ''))
        if (!usuario) {
          message.reply('Mencione um membro valido.')
        }
        const guildDocument = await this.client.database.user.getOrCreate(usuario.id)
        const strike = new MessageEmbed()

          .setThumbnail(usuario.displayAvatarURL({ dynamic: true, size: 1024 }))
          .setTitle('System | Trust & Safety')
          .setColor(colors['default'])
          .setDescription(`\n\n<:a_blurpleemployee:856174396423274516> O Discord é focado em manter um conteúdo seguro e confiável para nossa comunidade, e sua conta foi sinalizada pela comunidade do Discord por violar nossas Diretrizes da Comunidade.\n\n<:martelodobem:1041234493744369715> **Staff:** ${message.author} \n**ID:** ${message.author.id}` + `\n<:martelodobem:1041234493744369715> **Infrator:** ${usuario.username} \n**ID:** ${usuario.id}`)
          .setImage(`https://miro.medium.com/max/3200/0*SCBRci_mo1Yhc9km`)
          .setFooter({ text: 'https://discord.com/guidelines', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
          .setTimestamp(new Date());
        guildDocument.strike += 1
        guildDocument.save().then(() => log.send({ embeds: [strike] }))
        if (guildDocument.strike >= 3) {
          guildDocument.blacklist = true
          guildDocument.blacklistReason = '[STRIKE EXCEDIDO] - Quebra dos termos de uso do Discord.'
          guildDocument.save().then(() => log.send(`O usuário \`${usuario.tag}\` foi adicionado da blacklist.`))
        }
        log.send(`O usuário \`${usuario.tag}\` acabou levando strike (${guildDocument.strike}))`)
        usuario.send('Olá, \n\nO Discord é focado em manter um conteúdo seguro e confiável para nossa comunidade, e sua conta foi sinalizada pela comunidade do Discord por violar nossas Diretrizes da Comunidade.\n\nSinceramente,\nDiscord Trust & Safety Team')
      }
        break
      case 'remove': {
        const usuario = await this.client.users.fetch(args[1].replace(/[<@!>]/g, ''))
        const guildDocument = await this.client.database.user.getOrCreate(usuario.id)
        log.send(`${usuario.tag} Teve seu strike removido! <:__:1090466363132354670>`)
        guildDocument.strike -= 1
        guildDocument.save()
        if (guildDocument.strike < 3) {
          guildDocument.blacklist = false
          guildDocument.blacklistReason = null
          guildDocument.save().then(() => log.send(`O usuário \`${usuario.tag}\` foi removido da blacklist.`))
        }
        log.send(`O usuário \`${usuario.tag}\` teve 1 strike removido (${guildDocument.strike})`)
      }
        break
      default: {
        message.reply('Você não informou a opção e o ID do usuário que deseja dar strike.')
      }
    }
  }
}
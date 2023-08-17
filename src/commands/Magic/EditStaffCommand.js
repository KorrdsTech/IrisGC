const { Command } = require('../../utils')

module.exports = class editstaff extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'editstaff'
    this.aliases = ['tes', 'whitelist']
    this.category = 'Magic'
    this.adminOnly = false
  }

  async run(message, args) {
    const staff = await this.client.database.user.getOrCreate(message.author.id)
    if (!staff.staff) {
      return message.reply('Você não pode utilizar este comando, somente os membros confiados da equipe <@&832812234551066624>')
    }
    if (!args[0]) {
      1
      return message.reply('Você tem que falar o id do usuario para que eu possa adicionar a TES...').then(sent => sent.delete({ timeout: 15000 }))
    }
    const usuario = await this.client.users.fetch(args[1].replace(/[<@!>]/g, ''))
    if (!usuario) {
      message.reply('Mencione um membro valido.')
    }
    const userDB = await this.client.database.user.getOrCreate(usuario.id)

    switch (args[0]) {
      case 'add': {
        userDB.staff = true
        userDB.save().then(() => message.reply(`Certo, o usuário ${usuario.tag} acabou de entrar para a equipe de \`Trust & Safety\``))
      }
        break
      case 'remove': {
        userDB.staff = false
        userDB.save().then(() => message.reply(`Certo, o usuário ${usuario.tag} acabou de ser removido da equipe de \`Trust & Safety\``))
      }
        break
      default: {
        message.reply('Você não escolheu uma opção válida. (`add`, `remove`)')
      }
    }
  }
}
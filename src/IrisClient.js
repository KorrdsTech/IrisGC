const { Client, Collection, MessageEmbed } = require('discord.js')
const { colors } = require('./utils')
const Fs = require('fs')
const Database = require('./utils/database/Database')
module.exports = class IrisClient extends Client {
  constructor(options) {
    super(options)

    this.commands = new Collection()
    this.initCommands('./src/commands')
    this.database = new Database()
    this.initListeners('./src/listeners')
  }

  initCommands(path) {
    Fs.readdirSync(path)
      .forEach(file => {
        try {
          const filePath = path + '/' + file
          if (file.endsWith('.js')) {
            const Command = require(`.${filePath}`)
            const command = new Command(this)
            const commandName = (command.name !== undefined) ? command.name : command.name = file.replace(/.js/g, '').toLowerCase()
            return this.commands.set(commandName, command)
          } else if (Fs.lstatSync(filePath).isDirectory()) {
            this.initCommands(filePath)
          }
        } catch (error) {
          console.error(error)
        }
      })
  }

  initListeners(path) {
    Fs.readdirSync(path)
      .forEach(file => {
        try {
          const filePath = path + '/' + file
          if (file.endsWith('.js')) {
            const Listener = require(`.${filePath}`)
            this.on(file.replace(/.js/g, ''), Listener)
          }

          const stats = Fs.lstatSync(filePath)
          if (stats.isDirectory()) {
            this.initListeners(filePath)
          }
        } catch (error) {
          console.error(error)
        }
      })
  }

  sendLoggerError(error) {
    console.log(error)
    const embed = new MessageEmbed()
      .setColor(colors['default'])
      .setTitle(error.name)
      .setAuthor({ name: this.user.username, iconURL: this.user.displayAvatarURL({ dynamic: true, size: 1024 }) })
      .addDescription(error.message)
      .addField('Arquivo', `${error.fileName} ${error.lineNumber}`)
    return this.channels.get('1001368892385533953').send({ embeds: [embed] })
  }
}
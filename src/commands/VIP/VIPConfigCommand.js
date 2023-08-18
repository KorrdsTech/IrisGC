const { Command } = require('../../utils')
const modelVip = require('../../utils/database/collections/Vip');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

module.exports = class vipconfig extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'vipconfig'
    this.aliases = ['vc', 'vipconfig', 'premiumconfig']
    this.category = 'VIP'
    this.permissions = ['MANAGE_GUILD']

  }

  async run(message, args) {

    const guildDocument = await this.client.database.guild.getOrCreate(message.guild.id)

    const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[1]);

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId('c')
        .setEmoji(`<:newmemberbadge:967660459878666331>`)
        .setLabel('Cadastrar')
        .setStyle('SUCCESS')
        .setDisabled(false),

      new MessageButton()
        .setCustomId('rc')
        .setEmoji(`<:ModMute:980288914914947113>`)
        .setLabel('RewCadastro')
        .setStyle('DANGER')
        .setDisabled(false),

      new MessageButton()
        .setCustomId('mv')
        .setEmoji(`📋`)
        .setLabel('Membros Vips')
        .setStyle('PRIMARY')
        .setDisabled(false)
    );

    const dashboard = new MessageEmbed()
      .setAuthor({ name: `${message.guild.name} | Dashboard VipConfig`, iconURL: this.client.user.avatarURL({ dynamic: true, size: 1024 }) })
      .setDescription(`<:dot:1040807881248882688> » Sistema para setar usuário como vip no servidor.`)
      .addFields([
        { name: `Comandos do Sistema`, value: `> **Cadastrar** » Cadastra o usuário como vip no servidor.\n> **RewCadastro** » Remove o cadastro vip do usuário.\n> **Membros Vips** » Possibilita ver membros que tem vip no seu servidor. [BETA]` }
      ])
      .setFooter({ text: `${message.author.username}, você possui 1 minuto para interagir.`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
      .setThumbnail('https://media.discordapp.net/attachments/957238449558155304/962048623284215828/config.png?width=410&height=410')
      .setColor(guildDocument.color_embed) // TROCO ISSO DPS
      .setTimestamp();

    message.reply({ embeds: [dashboard], components: [row] })

    const collector = message.channel.createMessageComponentCollector({
      componentType: 'BUTTON',
      time: 60000,
    });

    collector.on('collect', async i=> {

      if (i.user.id != message.author.id)
        return i.reply(`<:dot:1040807881248882688> » ${i.user} você não pode acessar o dashboard, pois não foi você que abriu.`);

      switch (i.customId) {

        case 'c': {

          i.reply(`<:dot:1040807881248882688> » Mencione o usuário que você deseja fazer o cadastro vip.`, {ephemeral: true}).then(() => {
            message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 90000, errors: ['time'], max: 1 }).on('collect', async message => {

              const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

              if (!usuario) {
                return message.reply(`<:dot:1040807881248882688> » Mencione um usuário valido.`)
              }
              if (usuario.id === this.client.user.id) {
                return message.reply(`<:dot:1040807881248882688> » Eu não posso ter vip.`)
              }

              let documentVip = await modelVip.findOne({
                guildID: message.guild.id,
                userID: usuario.id,
              }).catch(err => console.log(err))

              if (!documentVip) {
                documentVip = new modelVip({
                  guildID: message.guild.id,
                  userID: usuario.id,
                  vip: true,
                })

                await documentVip.save().then(async () => {
                  const msg = await message.reply(`<:dot:1040807881248882688> » Estou setando o usuário como vip no banco de dados.`)
                  setTimeout(() => {
                    msg.edit({ content: `<:dot:1040807881248882688> » O usuário foi setado como vip com sucesso.` })
                  }, 5000)
                })
              }

              else {

                if (documentVip.vip) {
                  return message.reply(`<:dot:1040807881248882688> » Esse usuário já é vip neste servidor.`)
                }
              }

            })
          })
        }

          break;
        case 'rc': {

          i.reply(`<:dot:1040807881248882688> » Mencione o usuário que você deseja remover o cadastro vip.`, {ephemeral: true}).then(() => {
            message.channel.createMessageCollector({ filter: m => m.author.id === message.author.id, time: 90000, errors: ['time'], max: 1 }).on('collect', async message => {

              const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

              if (!usuario) {
                return message.reply(`<:dot:1040807881248882688> » Mencione um usuário valido.`)
              }
              if (usuario.id === this.client.user.id) {
                return message.reply(`<:dot:1040807881248882688>} » Eu não possuo vip.`)
              }

              const documentVip = await modelVip.findOne({
                guildID: message.guild.id,
                userID: usuario.id,
              }).catch(err => console.log(err))

              if (documentVip == null) {
                return message.reply(`<:dot:1040807881248882688> » Esse usuário não possui vip neste servidor.`)
              }

              await documentVip.delete().then(async () => {
                const msg = await message.reply(`<:dot:1040807881248882688> » Estou removendo o usuário como vip no banco de dados.`)
                setTimeout(() => {
                  msg.edit({ content: `<:dot:1040807881248882688> » O usuário foi removido como vip do servidor com sucesso.` })
                }, 5000)
              })

            })
          })

        }
          break;

        case 'mv': {

          const documentVip2 = modelVip.findOne({
            guildID: i.guild.id,
          }).catch(err => console.log(err))

          if (documentVip2 == null) {
            return i.reply(`Seu servidor não possui nenhum membro cadastrado`, {ephemeral: true})
          }

          const userDoc = await this.client.database.user.model.find({ 'vip': true })
          const msg = [];
      
          let guild = this.client.guilds.cache.get(`${message.guild.id}`);
          for (let i = 0; i < userDoc.length; i++) {
                  if (guild.members.cache.get(userDoc[i]._id) == null)
                           continue
                  const user = await this.client.users.fetch(userDoc[i]._id)
                  msg.push(`${user.tag} - ${user.id}`)
          }

          return i.reply(`${msg.join('\n')}`)
        }

      }
    }) // End

  }
}

const { Command } = require('../../utils')
const Jimp = require('jimp');

module.exports = class palavra extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'words'
    this.aliases = ['palavras']
    this.category = 'Fun'
  }

  async run(message) {
    if (message.content.split(' ').slice(1).join(' ').length < 1) {
      message.reply('`Você não escreveu nada junto ao comando \n Modo de uso: -palavras Alguma coisa aqui`')
    } else {
      if (message.content.split(' ').slice(1).join(' ').length > 50) {
        message.reply('❌ | `Você ultrapassou o limite de 50 caracteres.`')
      } else {
        if (message.member.permissions.has('ATTACH_FILES')) {
          const authorMessage = message
          message.reply('🕛 | Aguarde...').then(message => {
            Jimp.read(`http://i.imgur.com/xXUtLqH.png`, function (err, image) {
              if (err) message.replyMessage('❌ | Algo deu muito errado ao criar a imagem')
              Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) {
                image.print(font, 11, 13, authorMessage.content.split(' ').slice(1).join(' ')[0] + '... ' + authorMessage.content.split(' ').slice(1).join(' ')[0] + '...', 400)
                image.print(font, 19, 290, authorMessage.content.split(' ').slice(1).join(' '), 320)
                image.getBuffer(Jimp.MIME_PNG, (err, buffer) => {
                  message.reply({
                    files: [{
                      attachment: buffer,
                      name: 'imagem.png'
                    }]
                  })
                });
              })
            })
          })
        } else {
          message.reply('❌ | Algo deu errado, certifique-se se eu tenho a permissão `ATTACH_FILES`')
        }
      }
    }
  }
}
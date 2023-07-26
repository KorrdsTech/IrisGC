const Discord = require("discord.js");
const colors = require('../../colors/colors.json')

module.exports = {
    name: "ping",
    description: "[⚒️] Veja o ping do bot!",
    type: Discord.ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        let ping = new Discord.EmbedBuilder()
            .setColor(colors.defaultColor)
            .setDescription(`**Meu ping está em ${client.ws.ping}ms**`)
            .setFooter({ text: `Comando executado por ${interaction.user.tag}` })
            .setTimestamp();

        interaction.reply({ content: `Verificando o ping`, embeds: [ping] });
    },
};

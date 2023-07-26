const Discord = require("discord.js")
const { ActivityType } = require('discord.js');
const client = new Discord.Client({ intents: [1, 512, 32768, 2, 128] });
require("dotenv").config();

client.on("ready", () => {
  console.log(`Logado.`);
  const s = [
    { name: `🔌 Versão ${require('./package.json').version}!`, type: ActivityType.Playing },
    { name: '🏆 Anda perdido? Me mencione!', type: ActivityType.Playing },
    { name: '🔑 Entre em contato para reportar qualquer bug.', type: ActivityType.Playing },
    { name: '🎍 Desfrute de uma moderação a nível superior!', type: ActivityType.Playing },
    { name: '👩‍🚀 Mais Comandos legais para Você!', type: 'PLAYING' },
  ];
  const stats = ['online', 'dnd', 'idle']
  setInterval(() => {
    const status = stats[Math.floor(Math.random() * stats.length)]
    const game = s[Math.floor(Math.random() * s.length)]
    client.user.setPresence({ activities: [game], status: status })
  }, 20 * 1000) // Add 20 seconds to avoid over-updating.
});

client.login(process.env.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

// Handlers _______________________________________

client.on("interactionCreate", async (interaction) => {
  if (interaction.type === Discord.InteractionType.ApplicationCommand) {
    const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(
      interaction.user.id
    );

    cmd.run(client, interaction);
  }
});

client.slashCommands = new Discord.Collection();

require("./handler")(client);

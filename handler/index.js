const fs = require("fs");
module.exports = async (client) => {
    const SlashsArray = [];

    const folder = fs.readdirSync('./src/commands');
    folder.forEach((subfolder) => {
        const files = fs.readdirSync(`./src/commands/${subfolder}/`);
        files.forEach((files) => {
            if (!files?.endsWith(".js")) return;
            files = require(`../src/commands/${subfolder}/${files}`);
            if (!files?.name) return;
            client.slashCommands.set(files?.name, files);

            SlashsArray.push(files);
        });
    });

    client.on("ready", async () => {
        client.guilds.cache.forEach((guild) => guild.commands.set(SlashsArray));
    });
    client.on("guildCreate", async (guild) => {
        guild.commands.set(SlashsArray);
    });
};

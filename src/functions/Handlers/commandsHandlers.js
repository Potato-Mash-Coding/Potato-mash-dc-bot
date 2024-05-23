const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const clientId = "1237900331778834513";
const guildIds = [
    "1237337616769355807",
    "541908066191278081",  
    "552154957441138689",  
    "1072083905768869898", 
    "1192894864715698218",
];

module.exports = (client) => {
    client.commandsHandlers = async () => {
        const commandFolders = fs.readdirSync('./src/commands');
        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith('.js'));

            const { commands, commandArray } = client;
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`指令: ${command.data.name} 成功`);
            }
        }

        const rest = new REST({ version: '9' }).setToken(process.env.token);
        try {
            console.log('刷新應用 (/) 中');

            for (const guildId of guildIds) {
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: client.commandArray }
                );
                console.log(`成功刷新應用伺服 ${guildId}`);
            }

            console.log('成功刷新應用 (/)');
        } catch (error) {
            console.error(error);
        }
    };
};

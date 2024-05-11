require('dotenv').config();

const { token } = process.env;
const { Client, GatewayIntentBits, Collection, Discord } = require('discord.js');
const TicTacToe = require('discord-tictactoe')
const fs = require('fs');

const client = new Client({ intents : [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions
    ]
})

client.commands = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync(`./src/functions`);
for (const folder of functionFolders) {
    const functionFiles = fs.readdirSync(`./src/functions/${folder}`).filter(file => file.endsWith('.js'));
    
    for (const file of functionFiles) 
        require(`./functions/${folder}/${file}`)(client);
}

client.commandsHandlers();
client.eventHandle();
client.login(token);
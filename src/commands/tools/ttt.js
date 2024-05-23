const TicTacToe = require('discord-tictactoe');
const { SlashCommandBuilder } = require('discord.js');
const game = new TicTacToe({ language: "zh-tw"});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('圈圈叉叉')
        .setDescription('玩一把圈圈叉叉')
        .addUserOption(option =>
            option.setName('opponent')
                .setDescription('選舉您的對手')
                .setRequired(true)),
    async execute(interaction) {
        const player2 = interaction.options.getUser('opponent');

        if (!player2) {
            await interaction.reply('請@你想指定的對手');
            return;
        }

        game.handleInteraction(interaction);
    }
};
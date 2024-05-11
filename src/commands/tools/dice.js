const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('拋骰子')
        .setDescription('骰子')
        .addIntegerOption(option => option.setName('面數').setDescription('骰子最大面數').setRequired(true)),

    async execute(interaction) {
        const sides = interaction.options.getInteger('面數');

        if (sides <= 0) {
            return await interaction.reply({
                content: '數子必需大於 0',
                ephemeral: true
            });
        }

        const result = Math.floor(Math.random() * sides) + 1;
        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle('🎲 骰子 🎲')
            .setDescription(`您在 ${sides} 面骰子中骰出了 ***${result}***`);
            

            await interaction.reply({ content: '', embeds: [embed] });
    }
};

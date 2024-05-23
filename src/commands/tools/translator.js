const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const translate = require('google-translate-api-x');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('翻譯')
    .setDescription('翻譯內容至特定語言')
    .addStringOption(option => option.setName('內容').setDescription('翻譯內容_請不要多於1024字節').setRequired(true))
    .addStringOption(option => option.setName('語言').setDescription('選擇翻譯至何種語言').addChoices(
            { name: '英文', value: 'en' }, 
            { name: '日文', value: 'ja' },
            { name: '中文', value: 'zh-TW' },
            { name: '韓文', value: 'ko' },
    ).setRequired(true)),
    async execute (interaction) {

        const { options } = interaction;
        const text = options.getString('內容');
        const lan = options.getString('語言');

        await interaction.reply({ content: `🤖正在翻譯該內容....`});

        const applied = await translate(text, { to: `${lan}`});

        const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle(`✅翻譯成功✅`)
        .addFields({ name: '內容', value: `\`\`\`${text}\`\`\``})
        .addFields({ name: '翻譯內容', value: `\`\`\`${applied.text}\`\`\``})

        await interaction.editReply({content: '', embeds: [embed]});
    }
}
        
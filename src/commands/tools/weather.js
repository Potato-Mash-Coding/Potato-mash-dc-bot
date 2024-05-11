const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const weather = require('weather-js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('天氣')
    .setDescription('查詢天氣')
    .addStringOption(option => option.setName('地點').setDescription('選擇地點').setRequired(true))
    .addStringOption(option => option.setName('溫度單位').setDescription('選擇溫度單位').addChoices([{ name: '華氏', value: 'F' }, { name: '攝氏', value: 'C' }]).setRequired(true)),
    async execute(interaction) {

        const { options } = interaction;
        const location = options.getString('地點');
        const degree = options.getString('溫度單位');

        await interaction.reply({ content: '正在收集天氣資料...' });

        weather.find({ search: location, degreeType: degree }, async function(err, result) {

            setTimeout(() => {
                if (err) {
                    console.log(err);
                    interaction.editReply({ content: `${err} | Because we are pulling data, sometimes timeouts happen! Try this again later` });
                } else {
                    if (result.length == 0){
                        return interaction.editReply({content: `I could not find the weather of ${location}!`});
                     } else {
                        const temp = result[0].current.temperature;
                        const type = result[0].current.skytext;
                        const name = result[0].location.name;
                        const feel = result[0].current.feelslike;
                        const icon = result[0].current.imageUrl;
                        const wind = result[0].current.winddisplay;
                        const day = result[0].current.day;
                        const alert = result[0].location.alert || `無`;

                        const embed = new EmbedBuilder()
                        .setColor("Blue")
                        .setTitle(`${name} 現在氣溫`)
                        .addFields({ name: '溫度', value: `${temp}`})
                        .addFields({ name: '體感溫度', value: `${feel}`})
                        .addFields({ name: '天氣', value: `${type}`})
                        .addFields({ name: '現在警報', value: `${alert}`})
                        .addFields({ name: '周', value: `${day}`})
                        .addFields({ name: '風向', value: `${wind}`})
                        .setThumbnail(icon)

                        interaction.editReply({content: '', embeds: [embed] });
                    }
                }
            }, 2000);
        });
    }
};

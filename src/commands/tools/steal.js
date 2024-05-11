const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { EmbedBuilder, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('偷貼圖')
    .setDescription('新增貼圖至伺服器')
    .addStringOption(option => option.setName('貼圖').setDescription('請選擇欲新增之貼圖').setRequired(true))
    .addStringOption(option => option.setName('名字').setDescription('欲新增貼圖之名字').setRequired(true)),

    async execute (interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuildExpressions))
            return await interaction.reply({
                content: "你需要擁有新增貼圖的權限。如沒有請向管理員申請才能使用此指令",
                ephemeral: true
            });

        let emoji = interaction.options.getString('貼圖')?.trim();
        const name = interaction.options.getString('名字');

        if (emoji.startsWith("<") && emoji.endsWith(">")) {

            const id = emoji.match(/\d{15,}/g)[0];

            const type = await axios.get(`http://cdn.discordapp.com/emojis/${id}.gif`)
            .then(image => {
                if (image) return "gif"
                else return "png"
                }).catch(err => {
                    return "png"
                })

            emoji = `http://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
        }

        interaction.guild.emojis.create({attachment: `${emoji}`, name: `${name}`})
        .then(emoji =>{
            const embed = new EmbedBuilder()
            .setColor("Blue")
            .setDescription(`已新增 ${emoji}, 新貼圖是以下名字 "***${name}***" `)

            return interaction.reply({ embeds: [embed]});
        }).catch(err => {
            interaction.reply({content: "已達伺服器上限,無法再新增", ephemeral: true})
        })
    }
}

/*Credit to FuZz*/
const { SlashCommandBuilder } = require("discord.js"); 
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('有活著嗎'),
    async execute(interaction, client)
    {   
        const message = await interaction.deferReply({
            fetchReply: true
        });
        
        const pingMessage = `API ms: ${client.ws.ping}\nClient Ping: ${message.createdTimestamp - interaction.createdTimestamp}\n我活著哦`
        await interaction.editReply(
            {
                content: pingMessage
            }
        );
    }
}

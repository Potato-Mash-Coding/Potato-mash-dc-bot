const { ContextMenuCommandBuilder, ApplicationCommandType} = require("discord.js");

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('偷頭像 by 薯基德')
        .setType(ApplicationCommandType.User),
    async execute(interaction, client)
    {   
        await interaction.reply ({
            content: `${interaction.targetUser.displayAvatarURL()}`
        });
    }
}
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("desc")
  .setDescription("Obtener la información de una tarea"),
  async execute(interaction) {
    await interaction.reply(`Not implemented yet!`)
  },
}

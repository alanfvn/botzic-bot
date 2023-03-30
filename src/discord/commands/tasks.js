import {dateFormat} from '../../misc/util.js'
import { getEvents } from '../../calendar/cal_man.js';
import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
  .setName("tareas")
  .setDescription("Obtener las tareas"),
  // execute
  async execute(interaction) {
    const events = getEvents()
    const embed = new EmbedBuilder()
    .setColor('#deff58')
    .setTitle("📝 Lista de tareas:")

    if(events.length > 0){
      events.forEach(event =>{
        embed.addFields({
          name: `📗 ${event.name.toLocaleUpperCase()}`,
          value: `
> 🕑 **Expira:** \`${dateFormat.format(event.expiry)}\`
> 🆔 **Id:** \`${event.id}\`
> 📑 **[Descripción](${event.url})**
`
        })
      })
    } else {
      embed.setDescription("No hay tareas 👌")
    }
    await interaction.reply({embeds: [embed]})
  }
}

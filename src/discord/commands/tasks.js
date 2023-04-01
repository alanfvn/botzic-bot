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
    .setTitle("📝 TAREAS:")

    if(events.length > 0){

      for(const ev of events){
        embed.addFields({
          name: `📗 ${ev.getName()}`,
          value: `
> 🕑 **EXPIRA:** \`${dateFormat.format(ev.getExpiry())}\`
> 🔢 **ID:** \`${ev.getId()}\`
`
        })
      }

    } else {
      embed.setDescription("No hay tareas 👌")
    }
    await interaction.reply({embeds: [embed]})
  }
}

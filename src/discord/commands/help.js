import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

const VALUES = {
  "clases":{
    "title": null,
    "color": "#ffd858",
    "fields": [
      {
        name: "Horarios 📅",
        value: `
1. **Lunes**
  - Telecomunicaciones
  - Proyecto de graduación II
2. **Martes**
  - Seminario de tecnologías de información
  - Aseguramiento de la calidad de software
3. **Miercoles**
  - Seminario de tecnologías de información
  - Proyecto de graduación II
4. **Jueves**
  - Seguridad y auditoria de sistemas
5. **Viernes**
  - Aseguramiento de la calidad de software
  - Telecomunicaciones
`
      },
    ]
  },
  "arreglos":{
    "title": null,
    "color": "#58f7ff",
    "fields": [
      {
        name: "Arreglos ⚒️",
        value: `\`\`\`powershell
# Arreglar Docker
bcdedit /set hypervisorlaunchtype auto

# Arreglar GNS3
bcdedit /set hypervisorlaunchtype off \`\`\``
      },
    ]
  },
  "compas":{
    "title": null,
    "color": "#58f7ff",
    "fields": [
      {
        name: "Compañeros 🫂",
        value: `
1. **Alan**
  - Alan David González López
  - 4090-19-4713
  - agonzalezl22@miumg.edu.gt
2. **Migue**
  - Manuel Miguel Miguel
  - 4090-19-9063  
  - mmiguelm2@miumg.edu.gt
3. **Noe**
  - Noé Abraham Caal Ac
  - 4090-19-16203
  - ncaala@miumg.edu.gt
4. **Raul**
  -  José Raúl Botzoc Mérida
  - 4090-19-7994
  - jbotzocm@miumg.edu.gt
`
      },
    ]
  },
}

function getEmbed(params) {
  const embed = new EmbedBuilder()
  const exists = params in VALUES
  if(!exists){
    embed.setDescription("Ayuda no encontrada 🤔, disponibles: clases, arreglos, compas")
  }else{
    const {title, color, fields} = VALUES[params]
    if(title){
      embed.setTitle(title)
    }
    embed.setColor(color)
    embed.addFields(fields)
  }
  return embed
}


export default {
  data: new SlashCommandBuilder()
  .setName("help")
  .setDescription("Obten información variada")
  .addStringOption(op =>
    op.setName('type')
    .setDescription('Tipo de ayuda')
    .setRequired(true)
    .addChoices(
      {name: "Horario de clases", value: "clases"}, 
      {name: "Arreglos de Windows", value: "arreglos"}, 
      {name: "Listado de compañeros", value: "compas"}, 
    )
  ),
  async execute(interaction) {
    const arg = interaction.options.getString('type')
    const embed = getEmbed(arg)
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
}

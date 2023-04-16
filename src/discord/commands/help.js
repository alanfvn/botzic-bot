import { SlashCommandBuilder, EmbedBuilder } from "discord.js";


const VALUES = {
  "clases":{
    "title": "Horarios 📅",
    "color": "#ffd858",
    "fields": [
      {
        name: "Lunes",
        value: "> `Ingeniería de software`\n> `Proyecto de graduación I`"
      },
      {
        name: "Martes",
        value: "> `Redes de computadoras II`\n> `Proyecto de graduación I`"
      },
      {
        name: "Miercoles",
        value: "> `Inteligencia artificial`\n> `Ingeniería de software`"
      },
      {
        name: "Jueves",
        value: "> `Admin. de tecnologías de la información`\n> `Inteligencia artificial`"
      },
      {
        name: "Viernes",
        value: "> `Admin. de tecnologías de la información`\n> `Redes de computadoras II`"
      }
    ]
  },
  "comandos":{
    "title": "Comandos 🔍",
    "color": "#bfff58",
    "fields": [
      {
        name: "Cisco 🌐",
        value: "[ENLACE](https://gist.github.com/alanfvn/9979f169c90e09187bbc0d60f3be4d68)"
      },
      {
        name: "Linux 🐧",
        value: "[ENLACE](https://gist.github.com/alanfvn/2d9b9c072669f83ff6c7c933c8a41504)"
      }
    ]
  },
  "arreglos":{
    "title": "Arreglos ⚒️",
    "color": "#58f7ff",
    "fields": [
      {
        name: "Docker",
        value: "`bcdedit /set hypervisorlaunchtype auto `"
      },
      {
        name: "GNS3",
        value: "`bcdedit /set hypervisorlaunchtype off `"
      }
    ]
  },
  "compas":{
    "title": "Compañeros 📃",
    "color": "#58f7ff",
    "fields": [
      {
        name: "Alan",
        value: "> `Alan David González López`\n> `4090-19-4713`\n> `agonzalezl22@miumg.edu.gt`"
      },
      {
        name: "Miguel",
        value: "> `Manuel Miguel Miguel`\n> `4090-19-9063`\n> `mmiguelm2@miumg.edu.gt`"
      },
      {
        name: "Noe",
        value: "> `Noé Abraham Caal Ac`\n> `4090-19-16203`\n> `ncaala@miumg.edu.gt`"
      },
      {
        name: "Raúl",
        value: "> `José Raúl Botzoc Mérida`\n> `4090-19-7994`\n> `jbotzocm@miumg.edu.gt`"
      }
    ]
  },
}

function getEmbed(params) {
  const embed = new EmbedBuilder()
  const exists = params in VALUES

  if(!exists){
    embed.setDescription("Ayuda no encontrada 🤔, disponibles: clases, arreglos, comandos, compas")
  }else{
    const data = VALUES[params]
    embed.setTitle(data.title)
    embed.setColor(data.color)
    embed.addFields(data.fields)
  }

  return embed
}


export default {
  data: new SlashCommandBuilder()
  .setName("help")
  .setDescription("Obten información variada")
  .addStringOption(op =>
    op.setName('type')
    .setDescription('Tipo de ayuda clases/arreglos/comandos')
    .setRequired(true)
  ),
  async execute(interaction) {
    const arg1 = interaction.options.getString('type', true).toLowerCase();
    const embed = getEmbed(arg1)
    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
}

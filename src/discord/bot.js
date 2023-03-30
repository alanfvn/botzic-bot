import {Client, Collection,Events, GatewayIntentBits} from 'discord.js'
import {getDir, getJSFiles, getPath, requireFile} from '../misc/file_utils.js'

const {DS_TOKEN} = process.env

async function start(){
  const client = new Client({ intents: [GatewayIntentBits.Guilds]})
  client.commands = new Collection();

  const cur_dir = getDir(import.meta.url)
  const commandsPath = getPath(cur_dir, 'commands')
  const commandFiles = getJSFiles(commandsPath)

  for (const file of commandFiles) {
    const filePath = getPath(commandsPath, file)
    const command = (await requireFile(filePath)).default
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }

  // comand interaction event
  client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`);
      return;
    }
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  });

  //start the bot
  client.login(DS_TOKEN)
}

export default start

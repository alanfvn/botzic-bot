import "dotenv/config.js"
import {REST, Routes} from 'discord.js'
import { getDir, getJSFiles, getPath, requireFile } from '../misc/file_utils.js';

const {
  DS_TOKEN: TOKEN, 
  GUILD_ID: GUILD, 
  CLIENT_ID: CLIENT
} = process.env

const DS_REST = new REST({ version: '10' }).setToken(TOKEN);

async function loadCommands(){
  const curdir = getDir(import.meta.url)
  const cmdPath = getPath(curdir, 'commands')
  const cmdFiles = getJSFiles(cmdPath)
  const commands = []
  for (const file of cmdFiles) {
    const filePath = getPath(cmdPath, file)
    const command = (await requireFile(filePath)).default
    commands.push(command.data.toJSON());
  }
  return commands
}


async function setupCommands(){
  const commands = await loadCommands()
  console.log(`Started refreshing ${commands.length} application (/) commands.`);

  try {

    if(!GUILD){
      await DS_REST.put(Routes.applicationCommands(CLIENT), { body: [] })
      console.log(`Deleted previous commands!`)
      const data = await DS_REST.put(Routes.applicationCommands(CLIENT),{ body: commands });
      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    }else{
      await DS_REST.put(Routes.applicationGuildCommands(CLIENT, GUILD), { body: [] })
      console.log(`Deleted previous commands!`)
      const data = await DS_REST.put(Routes.applicationGuildCommands(CLIENT, GUILD),{ body: commands });
      console.log(`Successfully reloaded ${data.length} guild (/) commands.`);
    }   
  } catch (error) {
    console.error(error);
  }
}

setupCommands()

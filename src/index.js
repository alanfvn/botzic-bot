import "dotenv/config.js"
import start from "./discord/bot.js"
import startTasks from './tasks/task_man.js'

startTasks().then(() => {
  start()
})

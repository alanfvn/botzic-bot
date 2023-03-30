import {fetchCalendar} from '../calendar/cal_man.js'

const INTERVAL = 1000*60*5

async function startTasks(){
  await fetchCalendar()
  setInterval(async () => { await fetchCalendar()}, INTERVAL);
}

export default startTasks;

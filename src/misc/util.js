import fs from 'fs'

//TODO: maybe change the date to the ISO format
const dateFormat = new Intl.DateTimeFormat('es-ES', {
  timeZone: 'America/Guatemala',
  year: "numeric", month: "2-digit",
  day: "2-digit", hour: "2-digit",
  minute: "2-digit"
})

function isDateGood(d1, d2){
  // i guess we pass dates by reference in js huh..
  const start = new Date(d1)
  const end = new Date(d2)
  /* 
    we substract one second on the final 
    date, because some events finish at 
    midnight and they don't get filtered
    correctly  
  */
  end.setSeconds(end.getSeconds()-1)
  const isExpired = start.getTime() > end.getTime()
  start.setHours(0,0,0,0)
  end.setHours(0,0,0,0)
  const daysAhead = (d2.getTime()-d1.getTime())/(1000*3600*24) > 14 
  return !isExpired && !daysAhead
}

async function dumpFile(data){
  await fs.promises.writeFile("debug_file.json", JSON.stringify(data))
}

export {isDateGood, dateFormat, dumpFile}

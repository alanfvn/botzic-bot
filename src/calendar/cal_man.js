import ical from 'node-ical'
import Event from './models/event.js'
import { isDateGood } from '../misc/util.js'

const CAL = process.env.CAL_URL || ""
let calData = {}

async function fetchCalendar(){
  const calendar = await ical.async.fromURL(CAL)
  // clean the calendar
  calData = {}

  for(const [uid,event] of Object.entries(calendar)){
    if(event.type !== 'VEVENT') continue;
    const {summary,end} = event
    if(discardEvent(summary) || !isDateGood(new Date(), end)) continue;
    calData[uid] = event
  }
}

function discardEvent(event){
  const events = ['aula virtual']
  return events.some(x => event.toLowerCase().includes(x)); 
}

function getEvents(){
  const events = Object.values(calData).map(calEv =>{
    const {uid, summary, end, url} = calEv 
    return new Event(uid, summary, end, url)
  })
  return events
}

function getEventDesc(uid){
  const event = calData[uid]
  return event?.description
}

export {fetchCalendar, getEvents, getEventDesc}

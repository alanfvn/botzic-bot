class Event {
  constructor(id, name, expiry, url){
    this.id = id
    this.name = name
    this.expiry = expiry
    this.url = url
  }

  // uid.slice(uid.lastIndexOf('-')+1, uid.length)

  get get_expiry(){
    // 🕐 Expira: ${dateFormat.format(end.setSeconds(end.getSeconds()-1))}
    return -1
  }

}

export default Event

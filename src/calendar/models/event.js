class Event {

  constructor(id, name, expiry, url){
    this.id = id
    this.name = name
    this.expiry = expiry
    this.url = url
  }

  getId(){
    const uid = `${this.id}`
    return uid.slice(uid.lastIndexOf('-')+1, uid.length);
  }

  getExpiry(){
    const exp = new Date(this.expiry)
    exp.setSeconds(exp.getSeconds()-1)
    return exp
  }

  getName(){
    const nm = `${this.name}`
    const reg = /\[.*\]/i
    return nm.replace(reg,'').toUpperCase();
  }
}

export default Event

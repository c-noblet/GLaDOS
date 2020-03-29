const env = require('./env.json');
const spawn = require("child_process").spawn
require('isomorphic-fetch');
const cron = require('node-cron');
const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram')
//const onDeath = require('death');

class Glados {
  constructor(){
    this.telegraf = new Telegraf(env.telegram.token)
    this.telegram = new Telegram(env.telegram.token)
    this.cron = cron.schedule
    // Every 15 minutes cronjobs
    this.cron('0 0,15,30,45 * * * *', () => {
      this.isHome(env.phones[1].name).then((reponse) => {
        if(reponse.state){
          console.log('home')
          this.telegram.sendMessage(env.telegram.corentin, 'Tu es à la maison')
        }else{
          console.log('absent')
          this.telegram.sendMessage(env.telegram.corentin, 'Tu es absent')
        }
      })
    })
    this.telegraf.on('text', (ctx) => ctx.reply('Hello World'))
    this.telegraf.launch()
  }

  whoIsAbsent() {
    return new Promise((resolve) => {
      const networkArray = [];
      for (let i = 0; i < env.phones.length; i++) {
        networkArray.push(GLaDOS.isHome(env.phones[i].mac))
      }
      console.log(networkArray)
      Promise.all(networkArray).then((values) => {
        const isAbsent = [];
        console.log(values)
        for (let i = 0; i < values.length; i++) {
          if(values === false){
            isAbsent.push(values[i].name)
          }
        }
        resolve(isAbsent);
      });
    });
  }

  isHome(person) {
    return new Promise((resolve, reject) => {
      let macAddress = ''
      for (let i = 0; i < env.phones.length; i++) {
        if(env.phones[i].name === person){
          macAddress = env.phones[i].mac
        }
      }
      if(macAddress === ''){
        reject('error : Wrong name given')
      }
      const scan = spawn('nmap',["-sP", "192.168.1.0/24"])
      scan.stdout.on('data', (data) => {
        if(data.toString().includes(macAddress.toUpperCase())){
          resolve({name: person, state: true})
        }
        if(data.toString().includes('Nmap done')){
          resolve({name: person, state: false})
        }
      });
    })
  }

  async servo(angle) {
    return new Promise((resolve, reject) => {
      const move = spawn('python',["lib/servo.py", angle])
      move.stdout.on('data', (data) => {
        if(data.toString().search('moved') >=0){
          resolve(true);
        }else{
          reject(data);
        }
      });
    })
  }

    /**
   * Update one or many Philips Hue lights
   * @param {Array} lightsArray Array of light int ID
   * @param {Boolean} state Set On or Off the lights (true or false)
   * @param {Number} saturation Set the Saturation (Intensity) of the lights (0 to 254)
   * @param {Number} brightness  Set the Brightness of the lights (0 to 254)
   * @param {Number} hue Set the color of the lights (0 to 65 535)
   */
  lights(lightsArray = null, state = null, saturation = null, brightness = null, hue = null) {
    return new Promise((resolve, reject) => {
      for (let i = 1; i < lightsArray.length+1; i++) {
        fetch(`http://${env.hue.bridgeIp}/api/${env.hue.user}/lights/${i}/state`, {
          method: 'PUT',
          body: JSON.stringify({
            on: state,
            sat: saturation,
            bri: brightness,
            hue: hue
          })
        })
        .then((results) => results.json())
        .then(data => {
          resolve(data)
        }).catch((error)=>{
          console.error(error);
          reject(error)
        });
      }
    })
  }
}

const GLaDOS = new Glados();
module.exports = GLaDOS;
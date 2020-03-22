const env = require('./env.json');
const spawn = require("child_process").spawn
require('isomorphic-fetch');
const wol = require('wake_on_lan');
const cron = require('node-cron');
const Telegraf = require('telegraf');
const Telegram = require('telegraf/telegram')
//const onDeath = require('death');

const GLaDOS = {}


GLaDOS.telegraf = new Telegraf(env.telegram.token)
GLaDOS.telegram = new Telegram(env.telegram.token)
GLaDOS.cron = cron.schedule

GLaDOS.test = 'test';

GLaDOS.cron('0 * * * * *', () => {
  GLaDOS.telegram.sendMessage(env.telegram.corentin, 'test')
})


GLaDOS.telegraf.on('text', (ctx) => ctx.reply('Hello World'))

GLaDOS.whoIsAbsent = () => {
  return new Promise((resolve) => {
    const networkArray = [];
    for (let i = 0; i < env.phones.length; i++) {
      networkArray.push(GLaDOS.isHome(env.phones[i].mac))
    }
    Promise.all(networkArray).then((values) => {
      const isAbsent = [];
      for (let i = 0; i < values.length; i++) {
        if(values === false){
          isAbsent.push(values[i].name)
        }
      }
        resolve(isAbsent);
    });
  });
}

GLaDOS.isHome = (macAddress) => {
  return new Promise((resolve) => {
    const scan = spawn('nmap',["-sn", "192.168.1.0/24"])
    scan.stdout.on('data', (data) => {
      if(data.toString().includes(macAddress.toUpperCase())){
        resolve(true)
      }
      if(data.toString().includes('Nmap done')){
        resolve(false)
      }
    });
  })
}

GLaDOS.wake = (macAddress) => {
  return new Promise((resolve, reject) => {
    wol.wake(macAddress, (error) => {
      if(error){
        reject(error)
      }else{
        resolve(true)
      }
    })
  })
}

GLaDOS.servo = (angle) => {
  const move = spawn('python',["lib/servo.py", angle])
  move.stdout.on('data', (data) => {
    if(data.toString().search('ended') >=0){
      return true;
    }else{
      return false;
    }
  });
}

/**
 * Update one or many Philips Hue lights
 * @param {Array} lightsArray Array of light int ID
 * @param {Boolean} state Set On or Off the lights (true or false)
 * @param {Number} saturation Set the Saturation (Intensity) of the lights (0 to 254)
 * @param {Number} brightness  Set the Brightness of the lights (0 to 254)
 * @param {Number} hue Set the color of the lights (0 to 65 535)
 */
GLaDOS.lights = (lightsArray = null, state = null, saturation = null, brightness = null, hue = null) =>{
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
      console.log(data);
    }).catch((error)=>{
      console.error(error);
    });
  }
}

GLaDOS.telegraf.launch()

module.exports = GLaDOS;
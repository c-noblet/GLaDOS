import axios from 'axios';
import env from '../env.json';
/**
 * Update Philips Hue lights array
 * @param {Array} lightsArray
 *  saturation: (0 to 254),
 *  brightness: (0 to 254),
 *  hue: (0 to 65 535)
 */
const lights = (lightsArray: ({id: number, state: boolean, saturation: number, brightness: number, hue: number})[]) => {
  return new Promise((resolve, reject) => {
    const fetchArray = [];
    for (let i = 1; i < lightsArray.length+1; i++) {
      try {
        fetchArray.push(
          axios.put(`http://${env.hue.bridgeIp}/api/${env.hue.user}/lights/${lightsArray[i].id}/state`, JSON.stringify({
            on: lightsArray[i].state,
            sat: lightsArray[i].saturation,
            bri: lightsArray[i].brightness,
            hue: lightsArray[i].hue
          }))
        );
      } catch (error) {
        reject(error);
      }
    }
    Promise.all(fetchArray).then((values: (object)[]) => {
      resolve(values)
    });
  })
}

module.exports = lights;
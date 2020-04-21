import axios from 'axios';
import { CommandContext } from '../context/commandContext';
import env from '../env.json';


const getColor = (color: string): number => {
  const colors = Object.entries(env.hue.colors);
  for (const [key, value] of colors) {
    if(key === color){
      return value;
    }
  }
  return 0;
}
/**
   * Update Philips Hue lights array
   * @param {Array} lightsArray
   *  saturation: (0 to 254),
   *  brightness: (0 to 254),
   *  hue: (0 to 65 535)
   */
export default {
  name: 'lights',
  description: 'is a test',
  async run(commandContext: CommandContext): Promise<string> {
    return new Promise((resolve, reject) => {
      let state: boolean;
      let response: string;
      let color = 0;
      let brightness = 10;
      if(commandContext.args[1] == 'off'){
        state = false;
        response = 'la lumière a été éteinte';
      }else{
        state = true;
        color = getColor(commandContext.args[1]);
        brightness = parseInt(commandContext.args[2]) * 25.4;
        response = `la lumière a été allumé et mise sur ${commandContext.args[1]}`;
      }

      try {
        axios.put(`http://${env.hue.bridgeIp}/api/${env.hue.user}/lights/${commandContext.args[0]}/state`, {
          on: state,
          sat: 254,
          bri: brightness,
          hue: color
        }).then(() => {
          resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
import axios from 'axios';
import { Command } from './command';
import { CommandContext } from './commandContext';
import env from '../env.json';

/**
 * Update Philips Hue lights array
 * @param {Array} lightsArray
 *  saturation: (0 to 254),
 *  brightness: (0 to 254),
 *  hue: (0 to 65 535)
 */
export class Lights implements Command {
  commandNames = ['lights'];
  
  async run(commandContext: CommandContext): Promise<string> {
    return new Promise((resolve, reject) => {
      let state: boolean;
      let response: string;
      if(commandContext.args[1] == 'on'){
        state = true;
        response = 'la lumière a été allumé';
      }else{
        state = false;
        response = 'la lumière a été éteinte';
      }

      try {
        axios.put(`http://${env.hue.bridgeIp}/api/${env.hue.user}/lights/${commandContext.args[0]}/state`, {
          on: state,
          sat: 254,
          bri: parseInt(commandContext.args[2]) * 25.4,
          hue: this.getColor(commandContext.args[3])
        }).then(() => {
          resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getColor(color: string): number {
    const colors = Object.entries(env.hue.colors);
    for (const [key, value] of colors) {
      if(key === color){
        return value;
      }
    }
    return 0;
  }
}

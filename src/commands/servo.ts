import { spawn } from 'child_process';
import { CommandContext } from '../context/commandContext';

export default {
  name: 'servo',
  description: 'is a test',
  async run(commandContext: CommandContext): Promise<string> {
    return new Promise((resolve) => {
      const move = spawn('python',["./build/lib/servo.py", commandContext.args[0].toString()]);
      move.stdout.on('data', (data) => {
        if(data.toString().search('moved') >=0){
          resolve(`Le servomoteur a tourné de ${commandContext.args[0]} degrés`);
        }
      });
    });
  }
}
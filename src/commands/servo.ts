import { spawn } from 'child_process';
import { CommandContext } from '../context/commandContext';

export default {
  name: 'servo',
  description: 'is a test',
  run(context: CommandContext): void {
    const move = spawn('python',["./build/lib/servo.py", context.args[0].toString(), context.args[1].toString()]);
    move.stdout.on('data', (data) => {
      if(data.toString().search('moved') >=0){
        context.appContext.reply(`Le servomoteur ${context.args[0]} a tourné de ${context.args[1]} degrés`);
      }
    });
  }
}
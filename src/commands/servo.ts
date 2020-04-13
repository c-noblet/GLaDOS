import { spawn } from 'child_process';
import { Command } from './command';
import { CommandContext } from './commandContext';

export class Servo implements Command {
  commandNames = ['servo'];

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
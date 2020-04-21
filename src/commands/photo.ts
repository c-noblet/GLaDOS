import { CommandContext } from '../context/commandContext';
import { MessageAttachment } from 'discord.js'
import { spawn } from 'child_process';
import { readFileSync } from 'fs';
import env from '../env.json';

export default {
  name: 'photo',
  description: 'take a photo',
  async run(context: CommandContext) {
    const photo = spawn('raspistill',["-q","10","-o","./build/assets/photos/image.jpg"]);
    photo.stdout.on('end', () => {
      if(context.app === 'discord'){
        const attachment = new MessageAttachment('./build/assets/photos/image.jpg');
        context.appContext.reply(attachment);
      }else{
        context.appContext.replyWithPhoto({source: readFileSync('./build/assets/photos/image.jpg')});
      }
    });
  }
}
import { Message, Client } from 'discord.js';
import opus from 'opusscript';
import env from '../env.json';
import { CommandHandler } from './commands/commandHandler';
const client = new Client();
const prefix = env.discord.prefix;
const commandHandler = new CommandHandler(env.discord.prefix);

/*client.on('message', (msg: Message): void => {
  if(msg.author.bot) return
  if(msg.content.indexOf(prefix) !== 0) return;
  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if(cmd === `${prefix}repeat`){
    msg.channel.send(args.join(' '));
    await msg.delete();
    console.log(`deleted message: ${msg.content}`);
  }

});*/



client.on('ready', ():void => console.log('Discord client is ready'));
client.on('error', console.error);
client.on('message', (message: Message) => commandHandler.handleMessage(message));
client.on('warn', console.warn);
client.on('debug', console.log);

client.login(env.discord.token);
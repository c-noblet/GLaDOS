import { Message, Client } from 'discord.js';
import env from '../env.json';
import { CommandContext } from '../context/commandContext';
import commands from '../commands';

const client = new Client();

client.on('ready', ():void => console.log('Discord client is ready'));
client.on('error', console.error);
client.on('message', async (message: Message) => {
  if(message.author.bot || !message.content.startsWith(env.discord.prefix)) return undefined;

  const commandContext = new CommandContext(message, env.discord.prefix);

  const matchedCommand = commands.find((command: any) => command.name.includes(commandContext.command));
  
  if(!matchedCommand) {
    // Si la commande n'existe pas
    await message.reply(`Je ne reconnais pas cette commande. Essayez ${env.discord.prefix}help`);
  }else{
    // Sinon on execute la fonction
    matchedCommand.run(commandContext);
  }
  //commandContext.context.delete();
});
client.on('warn', console.warn);

export default client;

import { Message, Client } from 'discord.js';
import env from '../env.json';
import { CommandHandler } from '../commands/commandHandler';

const commandHandler = new CommandHandler(env.discord.prefix);
const client = new Client();

client.on('ready', ():void => console.log('Discord client is ready'));
client.on('error', console.error);
client.on('message', (message: Message) => commandHandler.handleDiscordMessage(message));
client.on('warn', console.warn);

export default client;

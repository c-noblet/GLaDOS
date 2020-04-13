import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { CommandHandler } from '../commands/commandHandler';
import env from '../env.json';

const telegraf = new Telegraf(env.telegram.token);
//const telegram = new Telegram(env.telegram.token);
const commandHandler = new CommandHandler(env.discord.prefix);

telegraf.on('message', (ctx: ContextMessageUpdate) => commandHandler.handleTelegramMessage(ctx));

export default telegraf;
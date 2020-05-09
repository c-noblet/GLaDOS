import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { CommandContext } from '../context/commandContext';
import env from '../env.json';
import commands from '../commands';

const telegraf = new Telegraf(env.telegram.token);
// const telegram = new Telegram(env.telegram.token);

telegraf.on('message', async (ctx: ContextMessageUpdate) => {
  // Vérifie si la commande vient d'un bot ou si elle n'existe pas
  if(ctx.from.username === 'GLaDOS' || !ctx.message.text.includes(env.discord.prefix)) return undefined;

  const commandContext = new CommandContext(ctx, env.discord.prefix);

  // Cherche la commande
  const matchedCommand = commands.find(command => command.name.includes(commandContext.command));

  if(!matchedCommand) {
    // Si la commande n'existe pas
    await ctx.reply(`Je ne reconnais pas cette commande. Essayez ${env.discord.prefix}help`);
  }else{
    // Sinon on execute la fonction
    matchedCommand.run(commandContext);
  }
  // ctx.deleteMessage;
});

export default telegraf;
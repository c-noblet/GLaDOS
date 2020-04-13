import { Message } from 'discord.js';
import { ContextMessageUpdate } from 'telegraf';
import { Command } from './command';
import { CommandContext } from './commandContext';
import { Servo } from './servo';
import { Lights } from './lights';

export class CommandHandler {
  private commands: Command[];
  private readonly prefix: string;

  constructor(prefix: string) {
    const commandClasses = [Servo, Lights];

    this.commands = commandClasses.map(commandClass => new commandClass());
    this.prefix = prefix;
  }

  async handleDiscordMessage(message: Message): Promise<void> {
    // Vérifie si la commande vient d'un bot ou si elle n'existe pas
    if(message.author.bot || !message.content.startsWith(this.prefix)) return undefined;
    const commandContext = new CommandContext(message, this.prefix);

    // Cherche la commande
    const matchedCommands = this.commands.find(command => command.commandNames.includes(commandContext.command));
    
    if(!matchedCommands) {
      // Si la commande n'existe pas
      await message.reply(`Je ne reconnais pas cette commande. Essayez ${this.prefix}help`);
    }else{
      // Sinon on execute la fonction
      const result = await matchedCommands.run(commandContext);
      await message.reply(result);
    }
    commandContext.context.delete();
  }

  async handleTelegramMessage(ctx: ContextMessageUpdate): Promise<void> {
    // Vérifie si la commande vient d'un bot ou si elle n'existe pas
    if(ctx.from.username == 'GLaDOS' || !ctx.message.text.includes(this.prefix)) return undefined;
    
    const commandContext = new CommandContext(ctx, this.prefix);

    // Cherche la commande
    const matchedCommands = this.commands.find(command => command.commandNames.includes(commandContext.command));
    
    if(!matchedCommands) {
      // Si la commande n'existe pas
      await ctx.reply(`Je ne reconnais pas cette commande. Essayez ${this.prefix}help`);
    }else{
      // Sinon on execute la fonction
      const result = await matchedCommands.run(commandContext);
      await ctx.reply(result);
    }
    ctx.deleteMessage;
  }
}
import { Message } from 'discord.js';
import { Command } from './command';
import { CommandContext } from './comandContext';
import { GreetCommand } from './greet';


export class CommandHandler {
  private commands: Command[];
  private readonly prefix: string;

  constructor(prefix: string){
    const commandClasses = [GreetCommand];

    this.commands = commandClasses.map(commandClass => new commandClass());
    this.prefix = prefix;
  }


  async handleMessage(message: Message): Promise<void> {
    // Vérifie si la commande vient d'un bot ou si elle n'existe pas
    if(message.author.bot || !this.isCommand(message)) return undefined;

    const commandContext = new CommandContext(message, this.prefix);

    // Cherche la commande
    const matchedCommands = this.commands.find(command => command.commandNames.includes(commandContext.command));
    
    if(!matchedCommands) {
      // Si la commande n'existe pas
      await message.reply(`Je ne reconnais pas cette commande. Essayez ${this.prefix}help`);
    }else{
      // Sinon on execute la fonction
      await matchedCommands.run(commandContext);
    }
  }

  private isCommand(message: Message): boolean {
    return message.content.startsWith(this.prefix);
  }
}
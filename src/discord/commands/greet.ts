import { Command } from './command';
import { CommandContext } from './comandContext';

export class GreetCommand implements Command {
  commandNames = ['greet', 'hello'];

  async run(commandContext: CommandContext): Promise<void> {
    commandContext.message.delete();
    commandContext.message.reply('bonjour à toi!');
  }
}
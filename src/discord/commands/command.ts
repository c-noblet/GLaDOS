import { CommandContext } from './comandContext';
export interface Command {
  readonly commandNames: string[];
  run(parsedUserCommand: CommandContext): Promise<void>;
}
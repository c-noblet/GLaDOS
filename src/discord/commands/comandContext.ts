import { Message } from 'discord.js';

// Récupère les informations d'une commande
export class CommandContext {
  readonly command: string;
  readonly args: string[];
  readonly message: Message;
  readonly prefix: string;

  constructor(message: Message, prefix: string) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    this.command = args.shift().toLowerCase();
    this.args = args;
    this.message = message;
    this.prefix = prefix;
  }
}
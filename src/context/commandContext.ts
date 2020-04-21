// Récupère les informations d'une commande
export class CommandContext {
  readonly command: string;
  readonly args: string[];
  readonly appContext: any;
  readonly prefix: string;
  readonly app: string;

  constructor(context: any, prefix: string) {
    let args = [];
    if(context.content){
      this.app = 'discord';
      args = context.content.slice(prefix.length).trim().split(/ +/g);
    }else{
      this.app = 'telegram';
      args = context.message.text.slice(prefix.length).trim().split(/ +/g);
    }
    
    this.command = args.shift().toLowerCase();
    this.args = args;
    this.appContext = context;
    this.prefix = prefix;
  }
}
import { spawn } from 'child_process';

export class Player {
  state: string;

  constructor(){
    this.state = 'stopped';
  }

  play(url: string) {
    this.state = 'playing';
    const player = spawn('play',["-v", "0.5", url]);
    player.stdout.on('data', (data: any): void => {
      if(data.toString().includes('Done.')){
        this.state = 'stopped';
      }
    });
  }

}
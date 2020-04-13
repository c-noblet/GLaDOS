import { spawn } from 'child_process';
import env from '../env.json';

export const isHome = (names: Array<string>=[]): Promise<Array<string>> => {
  return new Promise((resolve) => {
    let phones: { name: string, mac: string }[] = [];
    const results: string[] = [];
    let scanResult = '';

    if(names.length === 0){
      phones = env.phones;
    }else{
      for (let i = 0; i < names.length; i++) {
        for (let j = 0; j < env.phones.length; j++) {
          if(env.phones[j].name === names[i]){
            phones.push(env.phones[j]);
          }
        }
      }
    }

    const scan = spawn('nmap',["-sP", "192.168.1.0/24"]);
    
    scan.stdout.on('data', (data: any): void => {
      scanResult += data.toString();
      if(data.toString().includes('Nmap done')){
        for (let i = 0; i < phones.length; i++) {
          if(scanResult.includes(phones[i].mac)){
            results.push(phones[i].name);
          }
        }
        resolve(results);
      }
    });
  });
}
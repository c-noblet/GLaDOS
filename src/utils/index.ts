import { spawn } from 'child_process';
import env from '../env.json';

export const isHome = (names: string[]=[]): Promise<string[]> => {
  return new Promise((resolve) => {
    let phones: { name: string, mac: string }[] = [];
    const results: string[] = [];
    let scanResult = '';

    if(names.length === 0){
      phones = env.phones;
    }else{
      for (const name of names) {
        for (const phone of env.phones) {
          if (phone.name === name) {
            phones.push(phone);
          }
        }
      }
    }

    const scan = spawn('nmap',["-sP", "192.168.1.0/24"]);

    scan.stdout.on('data', (data: any): void => {
      scanResult += data.toString();
      if(data.toString().includes('Nmap done')){
        for (const phone of phones) {
          if(scanResult.includes(phone.mac)){
            results.push(phone.name);
          }
        }
        resolve(results);
      }
    });
  });
}
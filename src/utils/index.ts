import { spawn } from 'child_process';
import env from '../env.json';
import { eventEmitter } from '../events'

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

export const getMqttLog = async () => {
  const mqttLog = spawn('journalctl',["-u", "zigbee2mqtt.service", "-f"]);
  mqttLog.stdout.on('data', (data: any): void => {
    const log = data.toString().trim().split("'");
    const name = log[1].replace('zigbee2mqtt/','');
    const deviceData = JSON.parse(log[3]);
    deviceData.name = name;
    eventEmitter.emit('mqtt', deviceData);
  });
}

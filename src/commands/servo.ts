import { spawn } from 'child_process';

const servo = async (angle:number): Promise<boolean | string> => {
  return new Promise((resolve, reject) => {
    const move = spawn('python',["lib/servo.py", angle.toString()]);
    move.stdout.on('data', (data) => {
      if(data.toString().search('moved') >=0){
        resolve(true);
      }else{
        reject(data);
      }
    });
  })
}

module.exports = servo;
import events from 'events';
import { telegram } from '../telegram';
import env from '../env.json';

export const eventEmitter = new events.EventEmitter();

eventEmitter.on('mqtt', (data) => {
  telegram.sendMessage(env.telegram.pm, data.click);
})
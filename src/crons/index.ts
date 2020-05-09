import { CronJob } from 'cron';
import { isHome } from '../utils';
import { Telegram } from 'telegraf';
import env from '../env.json';

const tg = new Telegram(env.telegram.token);
export const quarterJob = new CronJob('0 0,15,30,45 * * * *', async () => {
  const results = await isHome();
  let response = '';
  for (const result of results) {
    response += ` ${result},`;
  }
  response = `${response.slice(0, -1)} sont à la maison`;
  tg.sendMessage(env.telegram.pm, response);
}, null, true, 'Europe/Paris');
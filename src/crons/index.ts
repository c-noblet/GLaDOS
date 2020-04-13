import { CronJob } from 'cron';
import { isHome } from '../utils';
import { Telegram } from 'telegraf';
import env from '../env.json';

const tg = new Telegram(env.telegram.token);
export const quarterJob = new CronJob('0 0,15,30,45 * * * *', async () => {
  const results = await isHome();
  let result = '';
  for (let i = 0; i < results.length; i++) {
    result += ` ${results[i]},`;
  }
  result = `${result.slice(0, -1)} sont à la maison`;
  tg.sendMessage(env.telegram.pm, result);
}, null, true, 'Europe/Paris');
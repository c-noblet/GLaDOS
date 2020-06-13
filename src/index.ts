import DiscordServer from './discord';
import { telegraf as TelegramServer } from './telegram';
import ExpressServer from './express';
import { quarterJob } from './crons';
import env from './env.json';

TelegramServer.launch();
DiscordServer.login(env.discord.token);
quarterJob.start();
ExpressServer.listen(env.express.port, () => {
  console.log(`Express à l'écoute sur le port ${env.express.port}`);
});



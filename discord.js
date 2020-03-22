const Discord = require('discord.js');
const client = new Discord.Client();
const opus = require('opusscript');
const PREFIX = '!';
const options = require('./options.json');

isCommand = (message) => {
  if(message.content[0] === PREFIX){
    return true;
  }else{
    return false;
  }
}

splitCommand = (message) => {
  const command = message.content.substr(1).split(' -');
  return {
    'app': command.shift(),
    'options': command.join('|')
  }
}

joinChannel = (user) => {
  return user.voiceChannel.join()
}

client.on('ready', () => {
  console.log('Discord connection: success');
});

client.on('message', message => {
  const user = message.member;
  if(isCommand(message)){
    const command = splitCommand(message);
    console.log(command);
    switch (command.app) {
      case 'test':
        switch (command.options) {
          case 'play':
            message.reply('play');
            joinChannel(user).then(connection => {
              const broadcast = client.createVoiceBroadcast();
              broadcast.playFile('./assets/voice/Portal 2 - GLaDOS 2_6 FR.mp3');
              for (const connection of client.voiceConnections.values()) {
                connection.playBroadcast(broadcast);
              }
            }).catch(console.error);
            break;
          default:
            message.reply('Je n\ai pas compris votre commande');
            break;
        }
        break;
      default:
        message.reply('Je n\ai pas compris votre commande');
        break;
    }
  }else{

  }
});

client.login(options.discord.token);
const config = require('./config.json');
const Client = require('./src/Client.js');
const { Intents } = require('discord.js');

global.__basedir = __dirname;

// Client setup
const intents = new Intents();
intents.add(
  'GUILDS',
  'GUILD_VOICE_STATES',
  'GUILD_MESSAGES',
  'GUILD_MESSAGE_REACTIONS'
);
const client = new Client(config, { ws: { intents: intents } });

// Initialize client
function init() {
  client.loadEvents('./src/events');
  client.loadCommands('./src/commands');
  client.login(client.token);
  //Put your token in config.json
  //To change prefix, go to: src/utils/db.js, go to line 21 and change "f!" to anything you want if you have not run the project yet. If you have run the project, delete all the sqlite files in the data folder before you change the prefix.
}

init();

process.on('unhandledRejection', err => client.logger.error(err));

const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end(' Mod Bot is online!');
});
server.listen(3000);

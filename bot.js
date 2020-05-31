const Discord = require("discord.js");
const settings = require("./settings.json");

//Initialize the bot
var Bot = new Discord.Client();

Bot.on("ready", function() {
  console.log("Connected");
  console.log("Logged in as: ");
  Bot.user.setPresence({
    activity: {
      name: "with swords | ??",
      type: 0
    }
  });
  console.log(Bot.user.username + " - (" + Bot.user.id + ")");
  require('./worlds/test');
});

Bot.login(settings.token);
module.exports = Bot;

require('./engine/combat').init();
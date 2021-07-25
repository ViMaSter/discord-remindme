// Main discord functionality
const Discord = require('discord.js');
const moment = require('moment');

const client = new Discord.Client();

client.on('ready', async () => {
    console.log(`[DISCORD] Discord library is ready!`);
    console.log(`[DISCORD] Logged in as ${client.user.tag}!`);
});

let runningTimers = {};

client.on('message', async msg => {
    if (msg.content.startsWith("!remindme"))
    {
        var params = msg.content.split(" ");
        if (params.length < 2)
        {
            msg.reply("Usage: `!remindme <relativetime> <message?>`\r\nExamples: `!remindme 30s This is a reminder!` or `!remindme 8h`)");
            return;
        }
        const timeRegex = /^(\d+)(h|m|s)?$/;
        if (!timeRegex.test(params[1]))
        {
            msg.reply("Usage: `!remindme <relativetime> <message?>`\r\nExamples: `!remindme 30s This is a reminder!` or `!remindme 8h`)");
            return;
        }

        const match = timeRegex.exec(params[1]);
        var newTime = moment().add(match[1], match[2]);
        var message = params.slice(2).join(" ");
        var reply = await msg.reply(`Got it! Reminding you at ${newTime}! (React with ❎ to cancel the reminder!)`);
        reply.react("❎");
        
        runningTimers[reply.id] = setTimeout(() => {
            msg.reply(`here's a reminder: ${!message ? `${msg.url}`: `"${message}" (from ${msg.url} )`}`);
            reply.delete().catch(console.error);
        }, newTime.diff(moment(), 'seconds') * 1000);

        const filter = (reaction, user) => {
            return reaction.emoji.name == "❎" && user.id === msg.author.id;
        };

        reply
            .awaitReactions(filter, { max: 1, errors: ['time'] })
            .then(collected => {
                clearTimeout(runningTimers[reply.id]);
                reply.delete().catch(console.error);
            });
    }
});

client.login(process.env.DISCORD_USER_TOKEN);
# !remindme Discord-bot

Discord-bot built using [Heroku](https://dashboard.heroku.com) as a provider.  
Notifies a user inside after a certain time interval about a custom message or original reminder message.

## Usage
Usage: `!remindme <relativetime> <message?>`

Examples:
- `!remindme 30s This is a reminder!`
- `!remindme 8h`

## Setup

1. Grab a Client ID from any of your [discord apps](https://discordapp.com/developers/applications/me) (create one if needed)
2. Join the Bot to any server using `https://discordapp.com/oauth2/authorize?client_id=[YOUR BOT CLIENT ID]&scope=bot&permissions=18432`
3. **(local)** Install the [Heroku Toolbelt](https://devcenter.heroku.com/articles/heroku-cli)
4. **(local)** Verify Node.js is >=v8.0.0 by running `node -v`; if not, [update it](https://nodejs.org/en/)
5. **(local)** Clone the repository
   **(remote)** Push this repository to your heroku app
6. **(local)** Run `npm install` and install any other package dependencies the output log mentions
7. **(local)** Create a .env-file containing the following lines (replace comments with values & remove headers):  
   **(remote)** Setup the following config variables in your Heroku-dashboard at `https://dashboard.heroku.com/apps/[YOUR-HEROKU-APP]/settings`:
```
--- Discord setttings ---
DISCORD_USER_TOKEN=          // [string]  User token of your discord app
```
8. **(local)** Run `heroku local` inside the repository  
   **(remote)** Restart all dynos

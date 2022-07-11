const { token } = require('./config')

const { logInfo, logError } = require('./utils')
const registerREST = require('./rest')
const handleSlashCommands = require('./slash')

const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] })

client.once('ready', () => {
  logInfo(`Logged in as ${client.user.tag}!`)
  client.user.setPresence({ activities: [{ name: 'github.com/joojdev/verification-bot' }], status: 'dnd' })
})

client.on('interactionCreate', async (interaction) => {
  if (interaction.isCommand()) return handleSlashCommands(interaction)
})

registerREST()

client.login(token)
const { token, clientId, guildId } = require('./config')

const { logError, logInfo } = require('./utils')

const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v10')
const fs = require('fs')

const commands = []
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'))

for (file of commandFiles) {
  const command = require(`./commands/${file}`)
  commands.push(command.data.toJSON())
}

const rest = new REST({ version: '10' }).setToken(token)

async function registerREST() {
  try {
    logInfo('Started reloading application (/) commands.')

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    )

    logInfo('Successfully reloaded application (/) commands.')
  } catch(error) {
    logError(error)
  }
}

module.exports = registerREST
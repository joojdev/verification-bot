const { SlashCommandBuilder } = require('@discordjs/builders')

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Pong!')

module.exports = { data }
const { SlashCommandBuilder } = require('@discordjs/builders')

const data = new SlashCommandBuilder()
  .setName('verify')
  .setDescription('Use this command to get the verified role.')

module.exports = { data }
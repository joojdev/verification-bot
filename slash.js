const { MessageButton, MessageActionRow } = require('discord.js')
const { roleId } = require('./config')

async function handleSlashCommands(interaction) {
  const { commandName } = interaction
  
  switch(commandName) {
    case 'ping':
      interaction.reply('Pong!')
      break
    case 'verify':
      const { id: userId } = interaction.user
      const isVerified = interaction.member.roles.cache.has(roleId)
      
      if (isVerified) return await interaction.reply('You\'re already verified!')
      
      function getRandomNumber(length) {
        const randomNumber = String(Math.floor(Math.random() * Number(Array(length).fill(9).join``)))
        const password = `${Array(6 - randomNumber.length).fill(0).join``}${randomNumber}`

        return password
      }
      
      const password = getRandomNumber(6)

      let buttonArray = [
        new MessageButton()
          .setCustomId('correct')
          .setLabel(password)
          .setStyle('SECONDARY')
      ]

      new Array(3).fill(undefined).map((_, index) => {
        return new MessageButton()
          .setCustomId(`wrong${index}`)
          .setLabel(getRandomNumber(6))
          .setStyle('SECONDARY')
      }).forEach((_) => buttonArray.push(_))

      buttonArray = buttonArray.sort(() => Math.random() - 0.5)

      const row = new MessageActionRow()
        .addComponents(...buttonArray)

      await interaction.reply({ content: `Press the button with the following password: *${password}*`, components: [row] })

      const filter = (buttonClick) => buttonClick.user.id == userId
      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 5000 })

      collector.on('collect', async (buttonClick) => {
        collector.stop()
        if (buttonClick.customId != 'correct') return await buttonClick.update({ content: '*Wrong password, try again!*', components: [] })
        await buttonClick.update({ content: '*Congratulations, you\'ve passed the test!*', components: [] })
        interaction.member.roles.add(roleId)
      })

      collector.on('end', (_collected, reason) => {
        if (reason == 'time') {
          interaction.editReply({ content: '*You need to be faster than that!*', components: [] })
        }
      })
      break
  }
}

module.exports = handleSlashCommands
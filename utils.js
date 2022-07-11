const chalk = require('chalk')

function needZero(number) {
  return String(number).length == 1
}

function getTimestamp() {
  const currentTime = new Date()

  const hours = currentTime.getHours()
  const minutes = currentTime.getMinutes()
  const seconds = currentTime.getSeconds()

  return `[${needZero(hours) ? '0' : ''}${hours}:${needZero(minutes) ? '0' : ''}${minutes}:${needZero(seconds) ? '0' : ''}${seconds}]`
}

function logMessage(type, color, message) {
  if (!message) throw Error()

  console.log([
    chalk.bgGray.black(getTimestamp()),
    chalk[color](`[${type}]`),
    chalk.yellow(message)
  ].join` `)
}

function logError(message) {
  logMessage('ERROR', 'red', message)
}

function logInfo(message) {
  logMessage('INFO', 'gray', message)
}

module.exports = {
  logError,
  logInfo
}
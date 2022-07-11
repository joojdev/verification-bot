const sharp = require('sharp')

const WIDTH = 180
const HEIGHT = 100

function returnImageBuffer(password) {
  const textBuffer = Buffer.from(`
  <svg width="${WIDTH}" height="${HEIGHT}">
    <text x="50%" y="65%" text-anchor="middle" font-family="monospace" font-size="30" fill="#ffffff">${password}</text>
  </svg>
  `)
  
  const imageBuffer = sharp({
    create: {
      width: WIDTH,
      height: HEIGHT,
      channels: 4,
      background: { r: 51, g: 51, b: 51, alpha: 1 }
    }
  })
    .composite([
      {
        input: textBuffer,
        top: 0,
        left: 0
      }
    ])
    .png()
  
  return imageBuffer
}

module.exports = returnImageBuffer
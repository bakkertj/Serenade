require('dotenv').config()

const { getCurrentlyPlaying } = require('./spotify')

async function main() {
  const playing = await getCurrentlyPlaying()
  console.log( playing )
}

;(async () => {
  try {
    await main()
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()

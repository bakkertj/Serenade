require('dotenv').config()

const { stringify } = require('querystring')
const fetch = require('node-fetch')

const client_id = 'ad2d2382fff449edac72a6f69e16d983'
const client_secret = '34a02a325b6b4971bcbbc1b688f15a12'
const refresh_token = 'AQBOgN7JUH9h8R9sIFljeFX3uEMEmRt4AXZ0mNFLabOmWUm-5OgNISpK1VWIDWZXVWNN7XUQtGj4W4w_ePyCtyjxgsL1IrSm09HaF0Jufx4ed_GvuKz3Uq1vpi_xuMhN3Z0'

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64')

const EndpointGetToken = 'https://accounts.spotify.com/api/token'
const EndpointGetTopTopTracks = 'https://api.spotify.com/v1/me/top/tracks'
const EndpointGetLastPlayed = 'https://api.spotify.com/v1/me/player/currently-playing'

const getAccessToken = async () => {
  const resp = await fetch(EndpointGetToken, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  })
  return resp.json()
}

exports.getTopTracks = async function getTopTracks() {
  const { access_token } = await getAccessToken()

  const resp = await fetch(`${EndpointGetTopTopTracks}?time_range=short_term`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
  return resp.json()
}

exports.getCurrentlyPlaying = async function getCurrentlyPlaying() {
  const { access_token } = await getAccessToken()

  const resp = await fetch(`${EndpointGetLastPlayed}?time_range=short_term`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  })
  return resp.json()
}

// ;(async () => {
//   const resp = await getTopTracks()
//   const data = await resp.json()
//   console.log(data)
// })()
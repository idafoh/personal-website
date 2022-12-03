import { NextApiRequest, NextApiResponse } from 'next'
import { getNowPlaying } from '../../lib/spotify'

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await getNowPlaying()

    if (response.status === 204 || response.status > 400) {
      return res.status(200).json({ isPlaying: false })
    }

    const result = await response.json()

    if (result.currently_playing_type !== 'track') {
      return res.status(200).json({ isPlaying: false })
    }

    const isPlaying = result.is_playing
    const title = result.item.name
    const artist = result.item.artists.map((_artist: any) => _artist.name).join(', ')
    const album = result.item.album.name
    const albumImageUrl = result.item.album.images[0].url
    const songUrl = result.item.external_urls.spotify

    res.status(200).json({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
    })
  } catch (error) {
    res.status(200).json({ isPlaying: false })
  }
}

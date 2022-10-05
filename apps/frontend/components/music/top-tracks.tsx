import { useEffect, useMemo, useState } from 'react'
import { Anchor, Group, Paper, Text, Title } from '@mantine/core'
import { usePlausible } from 'next-plausible'

const emptyTracks = Array(10).fill({
  title: 'Song title',
  artist: 'Artist name',
  songUrl: '',
})

export const TopTracks: React.FC = () => {
  const plausible = usePlausible()
  const [tracks, setTracks] = useState<any[]>(emptyTracks)

  useEffect(() => {
    fetch('/api/top-tracks')
      .then((res) => res.json())
      .then((data) => {
        setTracks(data)
      })
  }, [])

  const memoTracks = useMemo(
    () =>
      tracks.map((track: any, index) => (
        <Group key={index} spacing="xs" mb="sm">
          <Text>{index + 1}.</Text>
          <Anchor<'a'>
            href={track.songUrl}
            onClick={() =>
              plausible('top-track', {
                props: { title: track.title, artist: track.artist },
              })
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {track.title}
          </Anchor>
          <span className="song-separator">–</span>
          <Text>{track.artist}</Text>
        </Group>
      )),
    [tracks]
  )

  return (
    <Paper>
      <Title order={3} mb="lg">
        [Music] Top Tracks
      </Title>

      {memoTracks}
    </Paper>
  )
}

import { useEffect, useState } from 'react'
import { animate } from 'motion'
import { Anchor, Text, Title } from '@mantine/core'
import { Icon } from '@iconify/react'

const AnimatedBars: React.FC = () => {
  useEffect(() => {
    animate(
      '#bar1',
      {
        transform: ['scaleY(1.0) translateY(0rem)', 'scaleY(1.5) translateY(-0.082rem)', 'scaleY(1.0) translateY(0rem)'],
      },
      {
        duration: 1.0,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    )
    animate(
      '#bar2',
      {
        transform: ['scaleY(1.0) translateY(0rem)', 'scaleY(3) translateY(-0.083rem)', 'scaleY(1.0) translateY(0rem)'],
      },
      {
        delay: 0.2,
        duration: 1.5,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    )
    animate(
      '#bar3',
      {
        transform: ['scaleY(1.0)  translateY(0rem)', 'scaleY(0.5) translateY(0.37rem)', 'scaleY(1.0)  translateY(0rem)'],
      },
      {
        delay: 0.3,
        duration: 1.5,
        repeat: Infinity,
        easing: ['ease-in-out'],
      }
    )
  }, [])

  return (
    <div className="bars-container">
      <span id="bar1" className="bar1" />
      <span id="bar2" className="bar2" />
      <span id="bar3" className="bar3" />
    </div>
  )
}

export const NowPlaying: React.FC = () => {
  const [data, setData] = useState<any | null>(null)

  useEffect(() => {
    fetch('/api/playing-song')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  return (
    <>
      <Title order={3} mt="lg">
        [Music] Currently playing
      </Title>
      <div className="now-playing-container">
        {data?.songUrl ? <AnimatedBars /> : <Icon icon="logos:spotify-icon" width={24} height={24} style={{ color: '#1DB954' }} />}
        <div className="now-playing">
          {data?.songUrl ? (
            <Anchor<'a'> className="playing-song-link" href={data.songUrl} target="_blank" rel="noopener noreferrer">
              {data.title}
            </Anchor>
          ) : (
            <Text className="not-playing">Not Playing</Text>
          )}
          <span className="song-separator">{' – '}</span>
          <p className="song-artist">{data?.artist ?? 'Spotify'}</p>
        </div>
      </div>
    </>
  )
}

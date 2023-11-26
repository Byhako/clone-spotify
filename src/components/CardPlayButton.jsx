import { Play, Pause } from './Player'
import { usePlayerStore } from '@/store/playerStore'

export default function CardPlayButton({ id }) {
  const {
    currentMusic,
    setCurrentMusic,
    isPlaying,
    setIsPlaying
  } = usePlayerStore(state => state)

  const isPlayingPlalist = isPlaying && currentMusic?.playlist?.id === id


  const handleClick = () => {
    if (isPlayingPlalist) {
      setIsPlaying(false)
      return
    }
    fetch(`/api/getInfoPlaylist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data
        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song:songs[0] })
      })
  }

  return (
    <button
      onClick={handleClick}
      className='card-play-button rounded-full bg-green-500 p-4 hover:bg-green-400'
    >
      {isPlayingPlalist && <p className='hidden'>si</p>}
      {isPlayingPlalist ? <Pause /> : <Play />}
    </button>
  )
}

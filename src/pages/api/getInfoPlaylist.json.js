import { allPlaylists, songs as allSongs } from '@/lib/data'

export async function GET({ params, request}) {
  const { url } = request
  const urlObj = new URL(url)
  const id = urlObj.searchParams.get('id')

  const playlist = allPlaylists.find(list => list.id === id)
  const songs = allSongs.filter(song => song.albumId === playlist.albumId)

  return new Response(JSON.stringify({ playlist, songs }), {
    headers: { 'content-type': 'application/json' }
  })
}
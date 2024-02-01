import type { Playlist } from '@lib/types/playlist'
import { playlistsSongs } from '@lib/playlists'
import { getSongBy } from 'src/services/main'

const isFullfilled = <T>(
  value: PromiseSettledResult<T>
): value is PromiseFulfilledResult<T> => value.status === 'fulfilled'

export default async function getSongsFromPlaylist(playlist: Playlist) {
  const songsBaseData = playlistsSongs.filter(
    (song) => song.playlistId === playlist.id
  )

  const songsSettledResults = await Promise.allSettled(
    songsBaseData.map(({ name, artists }) =>
      getSongBy({ title: name, artist: artists.join(', ') })
    )
  )

  return songsSettledResults.filter(isFullfilled).map((result) => result.value)
}

import { playlists } from './playlists'
import { albums } from './albums'
import { artists } from './artists'

export const profileContent = [...playlists, ...albums, ...artists].sort(
  (a, b) => {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()

    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  }
)

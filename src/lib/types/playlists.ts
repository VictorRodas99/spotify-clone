import type { ProfileContent } from './general'

export interface Playlist extends ProfileContent {
  id: string
  title: string
  description?: string
  cover: string
  creator: string
  likes: number
  tracks: number
}

export interface PlaylistSong {
  id: number
  playlistId: string
  title: string
  artists: string[]
}

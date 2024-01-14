export interface Playlist {
  id: string
  name: string
  description?: string
  cover: string
  creator: string
  likes: number
  tracks: number
  type: 'playlist'
}

export interface PlaylistSong {
  id: number
  playlistId: string
  name: string
  artists: string[]
}

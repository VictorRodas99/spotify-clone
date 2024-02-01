export const content = {
  album: 'album',
  playlist: 'playlist',
  artist: 'artist'
} as const

export interface SimplifiedAlbum {
  name: string
  artists: string[]
  type: 'album'
  // the songs are going to be fetched, not hardcoded
  // the data (date release, time, cover, etc) is going to be fetched as well
}

export interface Artist {
  name: string
  type: 'artist'
}

export interface Song {
  id: number
  title: string
  songPreview: string
  artist: string
  album: {
    id: number
    title: string
    type: string
    coverSmall: string
    coverMedium: string
    coverBig: string
    coverXL: string
  }
  durationSeconds: number
  type: string
  explicitLyrics: boolean
}

export interface Album {
  title: string
  coverBig: string
  type: 'album'
  artist: {
    id: number
    name: string
    pictureSmall: string
  }
  releaseDate: string
  numberOfTracks: number
  durationSeconds: number
  tracks: Song[]
  label: string
}

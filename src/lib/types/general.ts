export interface Album {
  name: string
  artists: string[]
  type: 'album'
  // the songs are going to be fetched, not hardcoded
  // the data (date release, time, cover, etc) are going to be fetched as well
}

export interface Artist {
  name: string
  type: 'artist'
}

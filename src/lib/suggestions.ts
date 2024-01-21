import type { Playlist } from './types/playlist'
import type { Album, Artist } from './types/general'
import { playlists } from './playlists'
import { content } from './types/general'

const [firstPlaylist, secondPlaylist] = playlists

export const greetingsSection: (Playlist | Album | Artist)[] = [
  {
    name: 'Dream, Ivory',
    artists: ['Dream, Ivory'],
    type: content.album
  },
  {
    name: 'Pablo Honey',
    artists: ['Radiohead'],
    type: content.album
  },
  {
    ...firstPlaylist
  },
  {
    name: 'Mazzy Star',
    type: content.artist
  },
  {
    name: 'Starflyer 59',
    artists: ['Starflyer 59'],
    type: content.album
  },
  {
    ...secondPlaylist
  }
]

export const secondSection: Album[] = [
  {
    name: 'loveless',
    artists: ['my bloody valentine'],
    type: content.album
  },
  {
    name: 'm b v',
    artists: ['my bloody valentine'],
    type: content.album
  },
  {
    name: 'The Bends',
    artists: ['Radiohead'],
    type: content.album
  },
  {
    name: 'Delaware',
    artists: ['Drop Nineteens'],
    type: content.album
  }
]

import type { Playlist, PlaylistSong } from './types/playlist'
import { content } from './types/general'

export const playlists: Playlist[] = [
  {
    id: '1',
    name: '11',
    description: ': )',
    creator: 'Víctor Rodas',
    cover: '/images/playlists/playlist-11.jpg',
    likes: 14,
    tracks: 10,
    type: content.playlist
  },
  {
    id: '2',
    name: 'dreamy shoes',
    description: '14',
    creator: 'Víctor Rodas',
    cover: '/images/playlists/playlist-dreamy-shoes.jpg',
    likes: 3,
    tracks: 10,
    type: content.playlist
  }
]

export const playlistsSongs: PlaylistSong[] = [
  {
    id: 1,
    playlistId: '1',
    name: 'Down the Line',
    artists: ['Beach Fossils']
  },
  {
    id: 2,
    playlistId: '1',
    name: 'This Year',
    artists: ['Beach Fossils']
  },
  {
    id: 3,
    playlistId: '1',
    name: 'back and forth',
    artists: ['Surf Rock Is Dead']
  },
  {
    id: 4,
    playlistId: '2',
    name: 'El comienzo',
    artists: ['La Suma de Todos los Tiempos']
  },
  {
    id: 5,
    playlistId: '2',
    name: 'Quietud',
    artists: ['El Club Audiovisual']
  },
  {
    id: 6,
    playlistId: '2',
    name: 'Grapes',
    artists: ['Ovlov']
  }
]

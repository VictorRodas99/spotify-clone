import type { Playlist, PlaylistSong } from './types/playlists'

export const playlists: Playlist[] = [
  {
    id: '1',
    title: '11',
    description: ': )',
    creator: 'Víctor Rodas',
    cover: '/images/playlists/playlist-11.jpg',
    likes: 14,
    tracks: 10,
    type: 'playlist'
  },
  {
    id: '2',
    title: 'dreamy shoes',
    description: '14',
    creator: 'Víctor Rodas',
    cover: '/images/playlists/playlist-dreamy-shoes.jpg',
    likes: 3,
    tracks: 10,
    type: 'playlist'
  }
]

export const playlistsSongs: PlaylistSong[] = [
  {
    id: 1,
    playlistId: '1',
    title: 'Down the Line',
    artists: ['Beach Fossils']
  },
  {
    id: 2,
    playlistId: '1',
    title: 'This Year',
    artists: ['Beach Fossils']
  },
  {
    id: 3,
    playlistId: '1',
    title: 'back and forth',
    artists: ['Surf Rock Is Dead']
  },
  {
    id: 4,
    playlistId: '2',
    title: 'El comienzo',
    artists: ['La Suma de Todos los Tiempos']
  },
  {
    id: 5,
    playlistId: '2',
    title: 'Quietud',
    artists: ['El Club Audiovisual']
  }
]

import type { Playlist } from '@lib/types/playlist'
import type { SimplifiedAlbum, Artist } from '@lib/types/general'
import { getAlbumBy, getArtistByName } from 'src/services/main'

export async function mapProfileItem({
  item
}: {
  item: Playlist | SimplifiedAlbum | Artist
}) {
  // TODO: validate data param with zod

  // first of all we are going to map this in Spanish
  const internationalizedDataType = {
    playlist: 'Playlist',
    album: 'Álbum',
    artist: 'Artista'
  }

  if (item.type === 'playlist') {
    const { id, name, cover, creator, type } = item

    return {
      id,
      name,
      image: cover,
      internationalizedType: internationalizedDataType[type],
      type,
      author: creator
    }
  }

  if (item.type === 'album') {
    const { artists, name, type } = item
    const joinedArtists = artists.join(', ')

    const album = await getAlbumBy({ albumName: name, artist: joinedArtists })

    if (!album) {
      console.error(`Album "${item.name}" not found!`)
      return null
    }

    const { id, title, coverBig } = album

    return {
      id,
      name: title,
      image: coverBig,
      internationalizedType: internationalizedDataType[type],
      type,
      author: artists[0]
    }
  }

  const artist = await getArtistByName(item.name)

  if (!artist) {
    console.error(`Artist "${item.name}" not found!`)
    return null
  }

  const { id, name, pictureBig } = artist

  return {
    id,
    name,
    image: pictureBig,
    internationalizedType: internationalizedDataType[item.type],
    type: item.type
  }
}

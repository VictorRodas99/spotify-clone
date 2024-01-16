import { API_URL } from 'src/config'
import {
  apiResponseAlbumSchema,
  type APIResponseAlbum,
  type Album
} from './validations/albums.zod'
import {
  apiResponseArtistSchema,
  type APIResponseArtist,
  type Artist
} from './validations/artist.zod'

export const getMainCoincidence = <T>(
  data: T[],
  filterCallback: (item: T) => boolean
) => {
  const results = data.filter(filterCallback)
  const [mainResult] = results

  return mainResult
}

export async function getAlbumBy({
  albumName,
  artist
}: {
  albumName: string
  artist: string
}) {
  if (typeof albumName !== 'string' || typeof artist !== 'string') {
    throw new Error(
      `Expected params to be strings, received ${{ albumName, artist }}`
    )
  }

  const response = await fetch(
    `${API_URL}/search/album?q="${albumName}"&artist="${artist}"&limit=10`
  )

  if (!response.ok) {
    console.error(`Cannot fetch album ${albumName}`)
    return null
  }

  const apiResponse = (await response.json()) as APIResponseAlbum

  const parsedResult = apiResponseAlbumSchema.safeParse(apiResponse)

  if (!parsedResult.success) {
    throw new Error(
      `Error parsing the JSON while fetching album "${albumName}"`
    )
  }

  const { data } = parsedResult.data

  const result = getMainCoincidence<Album>(
    data,
    (album) => album.title === albumName && album.artist.name === artist
  )

  if (!result) {
    console.error(
      `ALBUM ERROR: Cannot retrieve a result that matches "${albumName}" in the given filter`
    )
    return null
  }

  return {
    id: result.id,
    title: result.title,
    coverSmall: result.cover_small,
    coverMedium: result.cover_medium,
    coverBig: result.cover_big,
    coverXl: result.cover_xl,
    tracklist: result.tracklist,
    artist: {
      id: result.artist.id,
      name: result.artist.name,
      pictureSmall: result.artist.picture_small,
      pictureMedium: result.artist.picture_medium,
      pictureBig: result.artist.picture_big,
      pictureXl: result.artist.picture_xl
    }
  }
}

export async function getArtistByName(name: string) {
  if (typeof name !== 'string') {
    throw new Error(`artist name must be string, received ${name}`)
  }

  const response = await fetch(`${API_URL}/search/artist?q="${name}"&limit=5`)

  if (!response.ok) {
    console.error(`Cannot fetch artist "${name}"`)
    return null
  }

  const apiResponse = (await response.json()) as APIResponseArtist

  const parsedResult = apiResponseArtistSchema.safeParse(apiResponse)

  if (!parsedResult.success) {
    throw new Error(`Error parsing the JSON while fetching artist "${name}"`)
  }

  const { data: relatedArtists } = parsedResult.data

  const artist = getMainCoincidence<Artist>(
    relatedArtists,
    (artist) => artist.name === name
  )

  if (!artist) {
    console.error(
      `ARTIST ERROR: Cannot retrieve a result that matches "${name}" in the given filter`
    )
    return null
  }

  return {
    id: artist.id,
    name: artist.name,
    tracklist: artist.tracklist,
    pictureSmall: artist.picture_small,
    pictureMedium: artist.picture_medium,
    pictureBig: artist.picture_big,
    pictureXl: artist.picture_xl
  }
}

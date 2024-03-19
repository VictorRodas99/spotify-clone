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
import {
  apiResponseSingleAlbumSchema,
  type APIResponseSingleAlbum
} from './validations/single-album.zod'
import { apiResponseNotFoundSchema } from './validations/not-found.zod'
import {
  apiResponseSongSchema,
  type APIResponseSong,
  type Song
} from './validations/song.zod'
import { API_ERROR } from './api-errors'

export const getMainCoincidence = <T>(
  data: T[],
  filterCallback: (item: T) => boolean
) => {
  const results = data.filter(filterCallback)
  const [mainResult] = results

  return mainResult
}

export async function getAlbumById({ id }: { id: number }) {
  if (isNaN(id)) {
    console.error('Expected id to be a valid number')
    return null
  }

  const response = await fetch(`${API_URL}/album/${id}`)

  if (!response.ok) {
    console.error(`Cannot fetch album with id ${id}`)
    return null // TODO: return { status: 'not found', data: null }
  }

  const apiResponse = (await response.json()) as APIResponseSingleAlbum

  const parsedResult = apiResponseSingleAlbumSchema.safeParse(apiResponse)

  if (!parsedResult.success) {
    const notFound = apiResponseNotFoundSchema.safeParse(apiResponse)

    if (notFound.success) {
      return null
    }

    throw new Error(
      `Error parsing the JSON while fetching album with id "${id}"`
    )
  }

  const album = parsedResult.data

  return {
    title: album.title,
    coverBig: album.cover_big,
    type: album.type,
    artist: {
      id: album.artist.id,
      name: album.artist.name,
      pictureSmall: album.artist.picture_small
    },
    releaseDate: album.release_date,
    numberOfTracks: album.nb_tracks,
    durationSeconds: album.duration,
    tracks: album.tracks.data.map((track) => ({
      id: track.id,
      title: track.title,
      songPreview: track.preview,
      artist: track.artist.name,
      type: track.type,
      album: {
        id: track.album.id,
        title: track.album.title,
        type: track.album.type,
        coverSmall: track.album.cover_small,
        coverMedium: track.album.cover_medium,
        coverBig: track.album.cover_big,
        coverXL: track.album.cover_xl
      },
      durationSeconds: track.duration,
      explicitLyrics: track.explicit_lyrics
    })),
    label: album.label
  }
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
    const parsedError = apiResponseNotFoundSchema.safeParse(apiResponse)

    if (parsedError.success) {
      const { code } = parsedError.data.error

      if (code === API_ERROR.QUOTA_LIMIT_ERROR) {
        return null
      }
    }

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

export async function getSongBy({
  title,
  artist
}: {
  title: string
  artist: string
}) {
  if (typeof title !== 'string' || typeof artist !== 'string') {
    console.error('Expected params to be strings')
    return null
  }

  const response = await fetch(
    `${API_URL}/search?q=artist:"${artist}" track:"${title}"&limit=5`
  )

  if (!response.ok) {
    console.error(`Cannot fetch song ${title} - ${artist}`)
    return null
  }

  const apiResponse = (await response.json()) as APIResponseSong

  const parsedResult = apiResponseSongSchema.safeParse(apiResponse)

  if (!parsedResult.success) {
    throw new Error(`Error parsing the JSON while fetching song "${title}"`)
  }

  const { data: relatedSongs } = parsedResult.data

  const song = getMainCoincidence<Song>(
    relatedSongs,
    (song) => song.title.toLocaleLowerCase() === title.toLocaleLowerCase()
  )

  if (!song) {
    console.error(
      `SONG ERROR: Cannot retrieve a result that matches "${title}" in the given filter`
    )
    return null
  }

  return {
    id: song.id,
    title: song.title,
    songPreview: song.preview,
    artist: song.artist.name,
    album: {
      title: song.album.title,
      type: song.album.type,
      id: song.album.id,
      coverSmall: song.album.cover_small,
      coverMedium: song.album.cover_medium,
      coverBig: song.album.cover_big,
      coverXL: song.album.cover_xl
    },
    durationSeconds: song.duration,
    type: song.type,
    explicitLyrics: song.explicit_lyrics
  }
}

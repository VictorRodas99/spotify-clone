import * as z from 'zod'

export const albumSimplifiedSchema = z.object({
  id: z.number(),
  title: z.string(),
  cover: z.string(),
  cover_small: z.string(),
  cover_medium: z.string(),
  cover_big: z.string(),
  cover_xl: z.string(),
  md5_image: z.string(),
  tracklist: z.string(),
  type: z.string()
})

export type AlbumSimplified = z.infer<typeof albumSimplifiedSchema>

export const artistSimplifiedSchema = z.object({
  id: z.number(),
  name: z.string(),
  picture: z.union([z.null(), z.string()]).optional(),
  type: z.literal('artist'),
  tracklist: z.union([z.null(), z.string()]).optional()
})

export const trackSchema = z.object({
  id: z.number(),
  readable: z.boolean(),
  title: z.string(),
  title_short: z.string(),
  title_version: z.string().optional(),
  link: z.string(),
  duration: z.number(),
  rank: z.number(),
  explicit_lyrics: z.boolean(),
  explicit_content_lyrics: z.number(),
  explicit_content_cover: z.number(),
  preview: z.string(),
  md5_image: z.string(),
  artist: artistSimplifiedSchema,
  album: albumSimplifiedSchema,
  type: z.string()
})

export type Track = z.infer<typeof trackSchema>

export const tracksSchema = z.object({
  data: z.array(trackSchema)
})

export const contributorSchema = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string(),
  share: z.string(),
  picture: z.string(),
  picture_small: z.string(),
  picture_medium: z.string(),
  picture_big: z.string(),
  picture_xl: z.string(),
  radio: z.boolean(),
  tracklist: z.string(),
  type: z.string(),
  role: z.string()
})

export type Contributor = z.infer<typeof contributorSchema>

export const artistAlbumPropertySchema = z.object({
  id: z.number(),
  name: z.string(),
  picture: z.string(),
  picture_small: z.string(),
  picture_medium: z.string(),
  picture_big: z.string(),
  picture_xl: z.string(),
  tracklist: z.string(),
  type: z.literal('artist')
})

export type Artist = z.infer<typeof artistAlbumPropertySchema>

export const genresPropertySchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      picture: z.union([z.null(), z.string()]).optional(),
      type: z.literal('genre')
    })
  )
})

export const apiResponseSingleAlbumSchema = z.object({
  id: z.number(),
  title: z.string(),
  upc: z.string(),
  link: z.string(),
  share: z.string(),
  cover: z.string(),
  cover_small: z.string(),
  cover_medium: z.string(),
  cover_big: z.string(),
  cover_xl: z.string(),
  md5_image: z.string(),
  genre_id: z.number(),
  genres: genresPropertySchema,
  label: z.string(),
  nb_tracks: z.number(),
  duration: z.number(),
  fans: z.number(),
  release_date: z.string(),
  record_type: z.string(),
  available: z.boolean(),
  tracklist: z.string(),
  explicit_lyrics: z.boolean(),
  explicit_content_lyrics: z.number(),
  explicit_content_cover: z.number(),
  contributors: z.array(contributorSchema),
  artist: artistAlbumPropertySchema,
  type: z.string(),
  tracks: tracksSchema
})

export type APIResponseSingleAlbum = z.infer<
  typeof apiResponseSingleAlbumSchema
>

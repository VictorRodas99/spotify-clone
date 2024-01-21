import * as z from 'zod'

export const artistSchemaSimplified = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string(),
  picture: z.string(),
  picture_small: z.string(),
  picture_medium: z.string(),
  picture_big: z.string(),
  picture_xl: z.string(),
  tracklist: z.string(),
  type: z.literal('artist')
})

export type ArtistAlbumProperty = z.infer<typeof artistSchemaSimplified>

export const recordTypeSchema = z.enum(['ep', 'album', 'single'])

export const albumSchema = z.object({
  id: z.number(),
  title: z.string(),
  link: z.string(),
  cover: z.string(),
  cover_small: z.union([z.null(), z.string()]),
  cover_medium: z.union([z.null(), z.string()]),
  cover_big: z.union([z.null(), z.string()]),
  cover_xl: z.union([z.null(), z.string()]),
  md5_image: z.string(),
  genre_id: z.number(),
  nb_tracks: z.number(),
  record_type: z.string(),
  tracklist: z.string(),
  explicit_lyrics: z.boolean(),
  artist: artistSchemaSimplified,
  type: recordTypeSchema
})

export type Album = z.infer<typeof albumSchema>

export const apiResponseAlbumSchema = z.object({
  data: z.array(albumSchema),
  total: z.number()
})

export type APIResponseAlbum = z.infer<typeof apiResponseAlbumSchema>

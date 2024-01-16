import * as z from 'zod'

export const artistSchema = z.object({
  id: z.number(),
  name: z.string(),
  link: z.string(),
  picture: z.string(),
  picture_small: z.string(),
  picture_medium: z.string(),
  picture_big: z.string(),
  picture_xl: z.string(),
  nb_album: z.number(),
  nb_fan: z.number(),
  radio: z.boolean(),
  tracklist: z.string(),
  type: z.string()
})

export type Artist = z.infer<typeof artistSchema>

export const apiResponseArtistSchema = z.object({
  data: z.array(artistSchema),
  total: z.number()
})

export type APIResponseArtist = z.infer<typeof apiResponseArtistSchema>

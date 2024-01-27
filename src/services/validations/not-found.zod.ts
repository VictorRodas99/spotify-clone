import * as z from 'zod'

export const errorSchema = z.object({
  type: z.string(),
  message: z.string(),
  code: z.number()
})

export const apiResponseNotFoundSchema = z.object({
  error: errorSchema
})

export type APIResponseNotFound = z.infer<typeof apiResponseNotFoundSchema>

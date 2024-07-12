import zod from 'zod'

const categorySchema = zod.object({
  description: zod.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  image: zod.string()
})

export function validateCategory(object) {
  return categorySchema.safeParse(object)
}

export function validatePartialCategory(input) {
  return categorySchema.partial().safeParse(input)
}

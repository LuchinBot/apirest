import zod from 'zod'

const categorySchema = zod.object({
  description: zod.string({
    invalid_type_error: 'Description must be a string',
    required_error: 'Description is required'
  }),
  image: zod.string().optional() // Hacer que la propiedad image sea opcional
})

export function validateCategory(object) {
  return categorySchema.safeParse(object)
}

export function validatePartialCategory(input) {
  return categorySchema.partial().safeParse(input)
}

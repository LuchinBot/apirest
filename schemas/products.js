import zod from 'zod'

const productSchema = zod.object({
  idcategories: zod.string({
    invalid_type_error: 'Idcategorys must be a string'
  }),
  title: zod.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required',
    min_length: 255
  }),
  slug: zod.string({
    invalid_type_error: 'Slug must be a string',
    required_error: 'Slug is required'
  }),
  description: zod.string({
    invalid_type_error: 'Description must be a string',
    required_error: 'Description is required'
  }),
  price: zod.preprocess(
    (val) => parseFloat(val),
    zod.number({
      invalid_type_error: 'Price must be a number',
      required_error: 'Price is required'
    })
  ),
  stock: zod.preprocess(
    (val) => parseInt(val, 10),
    zod.number({
      invalid_type_error: 'Stock must be a number',
      required_error: 'Stock is required'
    })
  ),
  image: zod.string().optional() // Hacer que la propiedad image sea opcional
})

export function validateProduct(object) {
  return productSchema.safeParse(object)
}

export function validatePartialProduct(input) {
  return productSchema.partial().safeParse(input)
}

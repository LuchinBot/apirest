const zod = require('zod')

const movieSchema = zod.object({
  title: zod.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  year: zod.number().int().min(1990).max(2024),
  director: zod.string(),
  duration: zod.number().int().positive(),
  poster: zod.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: zod.array(zod.enum(['Action', 'Drama', 'Comedy']), {
    invalid_type_error: 'Genre must be an array of strings',
    required_error: 'Genre is required'
  }),
  rate: zod.number().min(0).max(10)
})

function validateMovie(object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input)
}
module.exports = {
  validateMovie,
  validatePartialMovie
}

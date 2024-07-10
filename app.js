// Constantes
const express = require('express')
const movies = require('./movies.json')
const { validateMovie, validatePartialMovie } = require('./movies')
const app = express()
const cors = require('cors')

// Usabilidades
app.use(express.json())
const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://surveys.erazosystem.com' // Agrega tu dominio aquí
]

app.use(
  cors({
    origin: (origin, callback) => {
      // Permitir solicitudes sin origin (por ejemplo, Postman) y solicitudes desde orígenes permitidos
      if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })
)
app.disable('x-powered-by')

// Rutas
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' })
})

// ------------GET-----------------
// Todos los recursos que sean MOVIES se identifica con /movies
app.get('/movies', (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovie = movies.filter((movie) => movie.genre.includes(genre))
    return res.json(filteredMovie)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)
  if (movie) res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

// ------------POST-----------------
app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newMovide = {
    id: crypto.randomUUID(),
    ...result.data
  }
  movies.push(newMovide)
  res.status(201).json(newMovide)
})
// Eliminar

app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === 1) {
    return res.status(404).json({ message: 'Movie not found' })
  }
  movies.splice(movieIndex, 1)
  return res.json({ message: 'Movie deleted' })
})

// Actualizar
app.patch('/movies/:id', (req, res) => {
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id)

  if (movieIndex === 1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie
  return res.json(updateMovie)
})
// ------------ESCUCHAR EL PUERTO-----------------

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})

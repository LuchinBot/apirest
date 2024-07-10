// Imports
import express, { json } from 'express'

import { moviesRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

// Routes
app.use('/movies', moviesRouter)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Port
const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Listening on port http://localhost:${PORT}`)
})

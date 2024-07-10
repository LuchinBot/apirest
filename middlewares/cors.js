import cors from 'cors'

const ACCEPTED_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:3000',
  'https://movies.com',
  'https://midu.dev'
]

export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) =>
  cors({
    origin: (origin, callback) => {
      if (!origin || acceptedOrigins.includes(origin)) {
        // Permitir la solicitud si el origen está en la lista de aceptados o si no hay origen (para solicitudes locales)
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })

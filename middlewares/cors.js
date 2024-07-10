import cors from 'cors'
const ACCEPTED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://surveys.erazosystem.com'
]
export const corsMiddleware = ({ acceptedOrigins = ACCEPTED_ORIGINS }) =>
  cors({
    origin: (origin, callback) => {
      // Permitir solicitudes sin origin (por ejemplo, Postman) y solicitudes desde orígenes permitidos
      if (!origin || acceptedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  })

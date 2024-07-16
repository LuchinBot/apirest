import multer from 'multer'
import path from 'path'

// Configurar el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/') // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)) // Asignar un nombre único al archivo
  }
})

export const upload = multer({ storage: storage })

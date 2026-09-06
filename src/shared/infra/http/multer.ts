import multer from 'multer'
import path from 'path'
import { randomUUID } from 'crypto'

export const uploadCertificate = multer({
  storage: multer.diskStorage({
    destination: process.env.UPLOADS_DIR || 'uploads',
    filename: (_, file, cb) => {
      cb(null, `${randomUUID()}${path.extname(file.originalname)}`)
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    const allowed = ['.pdf', '.jpg', '.jpeg', '.png']
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, allowed.includes(ext))
  },
})

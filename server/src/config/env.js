const path = require('path')
const dotenv = require('dotenv')

dotenv.config({
  path: path.resolve(__dirname, '../../.env')
})

const isProduction = process.env.NODE_ENV === 'production'

const PORT = Number(process.env.PORT) || 3000

// En producción (Vercel), SIEMPRE debe venir de variable de entorno
// En local usamos fallback
const CLIENT_URL = isProduction
  ? process.env.CLIENT_URL
  : process.env.CLIENT_URL || 'http://127.0.0.1:5500'

if (isProduction && !CLIENT_URL) {
  throw new Error('CLIENT_URL no está definido en producción')
}

module.exports = {
  PORT,
  CLIENT_URL,
  isProduction
}
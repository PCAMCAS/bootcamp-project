const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const isProduction = process.env.NODE_ENV === 'production';

const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://127.0.0.1:5500';

if (!isProduction && !process.env.PORT) {
  throw new Error('El puerto no está definido');
}

module.exports = {
  PORT,
  CLIENT_URL,
  isProduction,
};
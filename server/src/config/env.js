const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

if (!PORT) {
  throw new Error('El puerto no está definido');
}

module.exports = {
  PORT,
  CLIENT_URL,
};
const dotenv = require('dotenv')
const path = require('path')

const { NODE_ENV = 'development' } = process.env

// load the contents of the `.env` file into `process.env`
dotenv.config({
  path: path.resolve(__dirname, `./.env.${NODE_ENV}`),
})

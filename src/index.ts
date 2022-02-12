import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import * as routes from './routes'

import './config/prisma';

const app = express()



// Middleware
app.use(compression())
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())


// API V1
app.use('/api/v1', routes.v1)

// Health Check
app.get('/', (_, res) => {
  res.send('OK')
})

const PORT = parseInt(process.env.PORT) || 3000
const HOSTNAME = '0.0.0.0'
app.listen(PORT, HOSTNAME, () => {
  console.log(`server is running on HOSTNAME: ${HOSTNAME}:${PORT}`)
})

import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRouter from './routes/authRouter.js'
import bodyParser from 'body-parser';
import { config } from 'dotenv';
config({ path: './.env.local' })

const DB = process.env.DATA_BASE
const PORT = process.env.PORT || 9090;

const app = express()
app.use(cors());
app.use(json())
app.use(bodyParser.json())
app.use('/', authRouter)

async function start() {
  try {
    await mongoose.connect(DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => {
      console.log(`server started on port: ${PORT}...`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()

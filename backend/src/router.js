import express from 'express'
import cors from 'cors'
import authController from './controller/authController.js';
import shortenController from './controller/shortenController.js';

const app = express()
const port = 3001;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/auth', authController)
app.use('/api/shorten', shortenController)

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
  });
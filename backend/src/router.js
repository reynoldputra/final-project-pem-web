import express from 'express'
import cors from 'cors'
import authController from './controller/authController.js';

const app = express()
const port = 3001;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/auth', authController)

app.listen(port, () => {
    console.log(`Listening on port http://localhost:${port}`);
  });
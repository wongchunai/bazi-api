// index.js
import express from 'express'
import bodyParser from 'body-parser'
import { getBaziFromInput } from './utils/bazi.js'

const app = express()
app.use(bodyParser.json())

app.post('/bazi', (req, res) => {
  try {
    const { year, month, day, hour, minute, gender, location } = req.body
    const result = getBaziFromInput({ year, month, day, hour, minute, gender, location })
    res.json(result)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.get('/', (req, res) => {
  res.send('Bazi API is running')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

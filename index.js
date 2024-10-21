import express from 'express'
import { extname, resolve } from 'path'
import multer from 'multer'
import imgBB from 'imgbb-uploader'
import fs from 'fs-extra'
import atob from 'atob'

const TOKEN = '8660860ec379863415d98e882c7f0bce'

const app = express()

const storage = multer.diskStorage({
  destination: resolve('./public/uploads'),
  filename: (req, file, cb) => {
    cb(null, Date.now() + extname(file.originalname))
  }
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(multer({ storage }).single('image'))

app.post('/uploads', async (req, res) => {
  const response = await imgBB(`https://api.imgbb.com/1/upload?expiration=600&key=${TOKEN}`, resolve('./public/uploads/' + req.file.filename))
  await fs.unlink(resolve('./public/uploads/' + req.file.filename))
  res.json(response)
})

app.use(express.static(resolve('./public')))

app.listen(3000, () => console.log('server on port 3000'))
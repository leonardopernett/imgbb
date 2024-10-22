import express from 'express'
import { extname, resolve } from 'path'
import multer from 'multer'
import imgBB from 'imgbb-uploader'
import fs from 'fs-extra'
import { generarToken, TOKEN, validaToken } from './middleware.js'


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

app.post('/api/uploads',validaToken, async (req, res) => {
  const response = await imgBB(`https://api.imgbb.com/1/upload?expiration=600&key=${TOKEN}`, resolve('./public/uploads/' + req.file.filename))
  await fs.unlink(resolve('./public/uploads/' + req.file.filename)  || '')
  res.json(response)
})

app.post('/api/login', (req,res)=>{
    const newuser = {
      email:'experience@konecta-group.com',
      password:'Konecta**'
    }
    const { email, password } = req.body
    
    if(email != newuser.email){
      res.status(401).json('user or password incorrect')
      return
    }

    if(password != newuser.password){
      res.status(401).json('user or password incorrect')
      return
    }

    const user = generarToken(req.body)

    res.json({
      token: user
    })

})

app.use(express.static(resolve('./public')) || '')

app.listen(3000, () => console.log('server on port 3000'))
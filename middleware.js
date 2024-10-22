

import fs from 'fs-extra'
import jwt from 'jsonwebtoken'
import { resolve } from 'path'

const SECRET_KEY = '**devOps**'
export const TOKEN = '8660860ec379863415d98e882c7f0bce'


export const generarToken = (user) => {
  return jwt.sign(user, SECRET_KEY, { expiresIn: '1h' })
}

export const validaToken = async (req, res, next) => {

    if (!req.headers.authorization) {
      await fs.unlink(resolve('./public/uploads/' + req.file.filename) || '')
      return res.status(401).json('unathorization')
    }

    const beared = req.headers.authorization.startsWith('Bearer ')


    if (!beared) {
      await fs.unlink(resolve('./public/uploads/' + req.file.filename) || '')
      return res.status(401).json('unathorization')
    }
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      await fsExtra.unlink(resolve('./public/uploads/' + req.file.filename) || '')
      return res.status(401).json('unathorization')
    }
 
    try {
      const payload = jwt.verify(token, SECRET_KEY)
 
      if (!payload) {
        await fs.unlink(resolve('./public/uploads/' + req.file.filename) || '')
        return res.status(401).json('unathorization')
      }
  
  
      next()
    } catch (error) {
      await fs.unlink(resolve('./public/uploads/' + req.file.filename) || '')
      return res.status(401).json('unathorization')
    }
  
}
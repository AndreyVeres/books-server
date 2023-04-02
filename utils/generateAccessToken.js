import jwt from 'jsonwebtoken'

const generateAccessToken = (id) => {
  const payload = { id }
  return jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' })
}

export default generateAccessToken

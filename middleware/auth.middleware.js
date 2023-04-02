import { verify } from 'jsonwebtoken';

const authmiddleware = (req, res, next) => {

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'auth error' });
    }

    const user = verify(token, process.env.SECRET);
    req.user = user
    next()
  } catch (err) {
    return res.status(401).json({ message: 'auth error' })
  }
}

export default authmiddleware;

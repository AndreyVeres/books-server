import User from '../models/userModel.js'
import { hashSync, compareSync } from 'bcrypt'
import { validationResult } from 'express-validator'
import generateAccessToken from '../utils/generateAccessToken.js'
import jwt from 'jsonwebtoken'
class AuthController {
  registration = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors)
      }

      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(409).json({ message: `Пользователь с именем ${username} уже существует.` });
      }

      const hashPassword = hashSync(password, 7);
      const user = new User({
        username,
        password: hashPassword
      });

      await user.save();
      return res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }

  login = async (req, res, next) => {
    try {
      const { username, password } = req.body
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json(`Пользователь с именем ${username} не найден`);
      }
      const validPassword = compareSync(password, user.password)

      if (!validPassword) {
        return res.status(400).json(`Неверный пароль`)
      }

      const token = generateAccessToken(user._id)

      return res.json({ token, user: { name: user.username } })

    } catch (err) {
      next(err)
    }
  }

  auth = async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.user.id })
      const token = jwt.sign({ id: user.id }, process.env.SECRET, { expiresIn: "1h" })

      return res.json({
        token,
        user: {
          name: user.username
        }
      })

    } catch (e) {
      console.log(e)
      res.send({ message: "Server error" })
    }
  }
}

const authController = new AuthController()

export default authController

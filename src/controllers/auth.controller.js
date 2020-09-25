import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/User'
import Role from '../models/Role'

dotenv.config()
const secretJWT = process.env.JWT_SECRET

export const singUp = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password)
    })
    const foundUser = await findUser({username, email})
    if (foundUser.length > 0) return res.status(401).json({ data: foundUser, message: "Can't register User" })
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } })
      newUser.roles = foundRoles.map(values => values._id)
    } else {
      const role = await Role.findOne({ name: 'user' })
      newUser.roles = [role._id]
    }
    const saveUser = await newUser.save()
    const token = jwt.sign({id: saveUser._id}, secretJWT, {
      expiresIn: 86400 // 24hrs
    })

    res.status(200).json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      msg: "Can't singUp"
    })
  }
}

export const singIn = async (req, res) => {
  try {
    const foundUser = await User.findOne({ email: req.body.email }).populate('roles')
    if (!foundUser) return res.status(202).json({ message: "User not Found" })
    const matchPassword = await User.comparePassword(req.body.password, foundUser.password)
    if (!matchPassword) return res.status(401).json({ token: null, message: "Invalid credentials" })
    const token = jwt.sign({id: foundUser._id}, secretJWT, {
      expiresIn: 86400 // 24hrs
    })

    res.json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: false,
      msg: "Can't singIn"
    })
  }
}

const findUser = async (data) => {
  const foundUserByEmail = await User.findOne({ email: data.email })
  const foundUserByUsername = await User.findOne({ username: data.username })

  if (foundUserByEmail || foundUserByUsername) {
    return foundUserByEmail && foundUserByUsername
      ? ['email', 'user']
      : foundUserByEmail
        ? ['email']
        : ['user']
  }

  return []
}

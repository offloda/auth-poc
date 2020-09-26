import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/User'
import Role from '../models/Role'

dotenv.config()

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers['x-access-token']
    if (!token) return res.status(403).json({ message: "No token provider" })
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decode.id
    const user = await User.findById(req.userId, { password: 0 })
    if(!user) return res.status(404).json({ message: "User not found" })

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Unauthorize" })
  }
}

export const isModerator = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId, { password: 0 })
    const roles = await Role.find({ _id: { $in: user.roles } })
    for(let i = 0; i < roles.length; i++) {
      if(roles[i].name === "moderator") {
        next()
        return
      }
    }
    return res.status(403).json({ message: "Require Moderator role" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Unauthorize" })
  }
}

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId, { password: 0 })
    const roles = await Role.find({ _id: { $in: user.roles } })
    for(let i = 0; i < roles.length; i++) {
      if(roles[i].name === "admin") {
        next()
        return
      }
    }
    return res.status(403).json({ message: "Require Admin role" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "Unauthorize" })
  }
}

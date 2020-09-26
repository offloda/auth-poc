import Role from '../models/Role'
import User from '../models/User'

export const checkRolesExisted = async (req, res, next) => {
  try {
    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } })
      if (roles < 1) return res.status(400).json({ message: `The Roles "${req.body.roles}" doesn't exist` })
      const getOnlyRoles = roles.map(value => value.name)
      if (getOnlyRoles.length !== req.body.roles.length) {
        const found = req.body.roles.filter(eFilter => !getOnlyRoles.includes(eFilter))
        if (found.length > 0) return res.status(400).json({ message: `The Roles "${found}" doesn't exist` })
      }
    }
  
    next()
  } catch (error) {
    return res.status(500).json({ message: "Error check RoLe" })
  }
}

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (user) return res.status(400).json({ message: 'The username already exists' })
    const email = await User.findOne({ email: req.body.email })
    if (email) return res.status(400).json({ message: 'The email already exists' })

    next()
  } catch (error) {
    return res.status(500).json({ message: "Error check User and Email" })
  }
}

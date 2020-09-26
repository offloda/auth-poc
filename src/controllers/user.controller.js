import User from '../models/User'
import Role from '../models/Role'

export const createUser = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body
    const newUser = new User({
      username,
      email,
      password: await User.encryptPassword(password)
    })
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } })
      newUser.roles = foundRoles.map(values => values._id)
    } else {
      const role = await Role.findOne({ name: 'user' })
      newUser.roles = [role._id]
    }
    await newUser.save()

    res.status(201).json({ message: `User ${username} created successfully` })
  } catch (error) {
    res.status(500).json({
      status: false,
      msg: "Can't createdUser"
    })
  }
}

const db = require("./../models")
const bcrypt = require("bcryptjs")
const jwt_decode = require("jwt-decode")

const USER_MODEL = db.tbl_users

async function registerAdmin(req, res) {
  try {
    const body = req.body
    const salt = process.env.SALT_KEY
    const hassPassword = await bcrypt.hash(body.password + salt, 12)

    const dataReq = {
      role: body.role,
      email: body.email,
      password: hassPassword,
      name: body.name,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    USER_MODEL.create(dataReq).then((data) => {
      res.status(200).json({
        message: "success"
      })
    })
  } catch (error) {
    console.log(error)
  }
}

async function registerMember(req, res) {
  try {
    const body = req.body
    const salt = process.env.SALT_KEY
    const hassPassword = await bcrypt.hash(body.password + salt, 12)

    const dataReq = {
      role: body.role,
      email: body.email,
      password: hassPassword,
      name: body.name,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    USER_MODEL.create(dataReq).then((data) => {
      res.status(200).json({
        message: "success"
      })
    })
  } catch (error) {
    console.log(error)
  }
}

function currentUser(req, res) {
  const authHeader = req.headers['authorization']
  const token = authHeader.split(' ')[1]
  const decode = jwt_decode(token)

  res.status(200).json({
    message: "success",
    data: {
      role: decode.role,
      name: decode.name
    }
  })
}

module.exports = {
  registerAdmin,
  registerMember,
  currentUser
}
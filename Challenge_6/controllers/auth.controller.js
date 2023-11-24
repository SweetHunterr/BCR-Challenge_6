const db = require("./../models")
const bcrypt = require("bcryptjs")
const jsonwebtoken = require("jsonwebtoken")
const USER_MODEL = db.tbl_users

async function login(req, res) {
  try {
    const body = req.body
    const salt = process.env.SALT_KEY

    // Find User
    if ((body.email !== "") && (body.password !== "")) {
      const user = await USER_MODEL.findOne({
        where: {
          email: body.email
        }
      })

      // Match Password
      const matchPassword = await bcrypt.compare(body.password + salt, user.password)

      if (!matchPassword) {
        return res.status(404).json({
          message: "username/password not found"
        })
      }

      const secretKey = process.env.JWT_KEY
      const expireKey = "2h"

      const tokenAccess = jsonwebtoken.sign(
        {
          id: user.id,
          role: user.role,
          name: user.name
        },
        secretKey,
        {
          algorithm: "HS256",
          expiresIn: expireKey
        }
      )

      return res.status(200).json({
        message: "success",
        token: tokenAccess
      })
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  login
}
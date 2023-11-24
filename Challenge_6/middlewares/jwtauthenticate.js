const jsonwebtoken = require("jsonwebtoken")

const authJWT = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (authHeader) {
    const token = authHeader.split(' ')[1]
    const secretKey = process.env.JWT_KEY
    jsonwebtoken.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: err.message
        })
      }

      req.user = user
      next()
    })
  } else {
    res.sendStatus(401)
  }
}

module.exports = {
  authJWT
}
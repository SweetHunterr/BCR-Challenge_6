const jwt_decode = require("jwt-decode")

const authCreateAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader.split(' ')[1]
  const decoded = jwt_decode(token)
  let role = decoded.role
  if (role === 'superadmin') {
    next()
  } else {
    res.status(401).json({
      message: "Anda Bukan Superadmin!"
    })
  }
}

const authControlCar = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader.split(' ')[1]
  const decoded = jwt_decode(token)
  let role = decoded.role
  switch (role) {
    case 'superadmin':
      next()
      break;
    case 'admin':
      next()
      break;
    default:
      res.status(401).json({
        message: "Anda Bukan Superadmin maupun Admin!"
      })
  }
}

module.exports = {
  authCreateAdmin,
  authControlCar
}
const db = require("./../models")
const jwt_decode = require("jwt-decode")
const CARS_MODEL = db.tbl_cars

function createCars(req, res) {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    const decoded = jwt_decode(token)
    let createBy = decoded.name
    let updateBy = decoded.name
    let deleteBy = ' '
    const body = req.body

    CARS_MODEL.create({
      name: body.name,
      harga: body.harga,
      createdBy: createBy,
      updatedBy: updateBy,
      deletedBy: deleteBy
    }).then(
      res.status(201).json({
        message: "success"
      })
    )
  } catch (error) {
    console.log(error)
  }
}

function getAllCars(req, res) {
  try {
    const query = {
      where: {
        deletedAt: null
      }
    }

    CARS_MODEL.findAll(query).then((data) => {
      res.status(200).json({
        message: "success",
        data: data
      })
    })
  } catch (error) {
    console.log(error)
  }
}

function getOneCars(req, res) {
  try {
    const query = {
      where: {
        id: req.params.id
      }
    }

    CARS_MODEL.findOne(query).then((data) => {
      res.status(200).json({
        message: "success",
        data: data
      })
    })
  } catch (error) {
    console.log(error)
  }
}

function updateCars(req, res) {
  try {
    const authHeader = req.headers['authorization']
    const token = authHeader.split(' ')[1]
    const decoded = jwt_decode(token)
    let updateBy = decoded.name
    const body = req.body
    const query = {
      where: {
        id: req.params.id
      }
    }

    const dataUpdate = {
      name: body.name,
      harga: body.harga,
      updatedBy: updateBy
    }

    CARS_MODEL.update(dataUpdate, query).then(
      res.status(200).json({
        message: "success"
      })
    )
  } catch (error) {
    console.log(error)
  }
}

function deleteCars(req, res) {
  const authHeader = req.headers['authorization']
  const token = authHeader.split(' ')[1]
  const decoded = jwt_decode(token)
  let deleteBy = decoded.name
  let timeDeleted = new Date()

  const query = {
    where: {
      id: req.params.id
    }
  }

  const dataUpdate = {
    deletedBy: deleteBy,
    deletedAt: new Date()
  }

  console.log(timeDeleted)

  CARS_MODEL.update(dataUpdate, query).then(
    res.status(200).json({
      message: "success"
    })
  )
}

module.exports = {
  createCars,
  getAllCars,
  getOneCars,
  updateCars,
  deleteCars
}
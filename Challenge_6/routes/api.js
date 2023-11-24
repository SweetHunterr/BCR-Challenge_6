var express = require('express');
const { login } = require('../controllers/auth.controller');
const { createCars, getAllCars, getOneCars, updateCars, deleteCars } = require('../controllers/cars.controller');
const { registerAdmin, registerMember, currentUser } = require('../controllers/users.controller');
const { authJWT } = require('../middlewares/jwtauthenticate');
const { authCreateAdmin, authControlCar } = require('../middlewares/roleauthenticate');
var router = express.Router();

// Register Admin
router.post("/v1/registerAdmin", [authJWT, authCreateAdmin], registerAdmin)
// Register Member
router.post("/v1/registerMember", registerMember)

// Create Car
router.post("/v1/createCar", [authJWT, authControlCar], createCars)
// Get All Car
router.get("/v1/getAllCar", getAllCars)
// Get One Car
router.get("/v1/getOneCar/:id", [authJWT, authControlCar], getOneCars)
// Update Car
router.put("/v1/updateCar/:id", [authJWT, authControlCar], updateCars)
// Delete Car
router.delete("/v1/deleteCar/:id", [authJWT, authControlCar], deleteCars)

// Auth User (To Get Token)
router.post("/v1/auth", login)
// Current User
router.get("/v1/currentUser", currentUser)

module.exports = router;
const { Router } = require('express');
const allDogs = require('../handlers/allDogs')
const dogByID = require('../handlers/dogByID')
//const dogsByName = require('../handlers/dogsByName')
const newDog = require('../handlers/newDog')
const allTemperaments = require('../handlers/allTemperaments')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/dogs', allDogs);
///router.get('/dogs/name', dogsByName);
router.get('/dogs/:id', dogByID);
router.get('/temperaments',allTemperaments)
router.post('/dogs',newDog);


module.exports = router;
const { Router } = require('express');
const { getDogHandler, getDogsHandler, postNewDog } = require('../handlers/dogsHandlers');
const { getTemperamentsHandler } = require('../handlers/temperamentsHandlers');
const express = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const validate = (req,res,next) => {
    const { name } = req.body;
    if(!name){
        res.status(400).json({error: "Missing data"})
    }
    next();
}

router.get("/dogs", getDogsHandler);
router.get("/dogs/:idRaza", getDogHandler);
router.get("/temperament", getTemperamentsHandler);
router.post("/dog", validate, postNewDog);

router.use(express.json());

module.exports = router;

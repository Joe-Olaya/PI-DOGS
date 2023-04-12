const { createDog, getDogsById, searchDogByName, getAllDogs } = require('../controllers/dogsController')


const getDogsHandler = async (req,res) => {
    const { name } = req.query;
    try {
        const results = name ? await searchDogByName(name) : await getAllDogs()
        res.status(200).json(results)
    } catch (error) {
        res.status(400).json({error:error.message});
    }
};

const getDogHandler = async (req,res) => {
    const { idRaza } = req.params;
    const source = isNaN(idRaza) ? "db" : "api";
    try {
        const dogs = await getDogsById(idRaza, source);
        res.status(200).json(dogs);
    } catch (error) {
        res.status(400).json({error:error.message});
    }

}

const postNewDog = async (req, res) => {
    const {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        temperaments,
        image
    } = req.body
    try {
        const newDog = await createDog(name, min_height, max_height,
            min_weight, max_weight, life_span, temperaments, image);
    
        res.status(201).json(newDog);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
    
}

module.exports = {
    getDogHandler,
    getDogsHandler,
    postNewDog
}
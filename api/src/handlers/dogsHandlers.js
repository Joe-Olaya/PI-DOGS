const { Dog, Temperament } = require('../db');
const { createDog } = require('../controllers/dogsController')
const axios = require('axios');


let apiUrl = `https://api.thedogapi.com/v1/breeds`

const getApiData = async() => {
    
    const apiData = await axios.get(apiUrl);
    const apiInfo = await apiData.data.map(el => {
    let temperamentArray = [];
    if (el.temperament) {
        temperamentArray = el.temperament.split(", ");
    }
    
    let heightArray = [];
    if (el.height.metric) {
        heightArray = el.height.metric.split(" - ");
    }

    let weightArray = [];
    if (el.weight.metric) {
        weightArray = el.weight.metric.split(" - ");
    }
        return {
            id: el.id,
            name: el.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temperamentArray,
            life_span: el.life_span,
            image: el.image.url,
        }
    })
return apiInfo;
}


const getDbData = async () => {
    return await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], 
            through: {
                attributes: [],
            },
        }
    })
};

const getAllDogs = async () => {
    const dataFromApi = await getApiData();
    const dataFromDb = await getDbData();
    const allDataMixed = [...dataFromApi, ...dataFromDb];
    return allDataMixed;
};

const getDogsHandler = async (req,res) => {
    const { name } = req.query;
    const allDogs = await getAllDogs();
    if (name) {
        const dog = allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        dog.length ? res.status(200).send(dog) : res.status(404).send("Dog not found"); 
    } else {
        res.status(200).send(allDogs);
    }

};

const getDogHandler = async (req,res) => {
    const { idRaza } = req.params;
    const allDogs = await getAllDogs();
    const dog = allDogs.filter(el => el.id == idRaza);
    if (dog.length) {
        res.status(200).json(dog);
    }else{
        res.status(404).send("Dog no found in the Data");
    }
}

const postNewDog = async (req, res) => {
    try {
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
    
        const newDog = await createDog(name, min_height, max_height,
            min_weight, max_weight, life_span, temperaments, image)
    
        res.status(201).json(newDog)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
    
}

module.exports = {
    getDogHandler,
    getDogsHandler,
    postNewDog
}
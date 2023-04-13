const { Dog, Temperament } = require('../db');
const axios = require('axios');

const getDogsById = async (id, source) => {
    if (source === "api"){
        const dog = (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)).data;

        const orderDog = {
            id: dog.id,
            name: dog.name,
            life_span: dog.life_span,
            height : dog.height.metric,
            weight : dog.weight.metric,
            temperament :dog.temperament.split(','),
            image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`
        }

        return orderDog
    } else {
        return await Dog.findByPk(id)
    }
}

const cleanData = (arr) => {
    dogs = [];
     arr.map((el) => {
        let temperamentArray = [];
        if (el.temperament) {
            temperamentArray = el.temperament.split(", ");
        };
        
        let heightArray = [];
        if (el.height.metric) {
            heightArray = el.height.metric.split(" - ");
        };
    
        let weightArray = [];
        if (el.weight.metric) {
            weightArray = el.weight.metric.split(" - ");
        };
        dogs.push(
            {
                id: el.id,
                name: el.name,
                height: heightArray,
                weight: weightArray,
                temperaments: temperamentArray,
                life_span: el.life_span,
                image: el.image.url,
                created : false
            }
        ) 
        
    });
    return dogs
};

const getAllDogs = async () => {
    const getDbData = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'], 
                through: {
                    attributes: [],
                },
            }
        })
    // getDbData = getDbData.map(e => {
    //     e.temperaments
    // })
    const getApiData = (await axios.get('https://api.thedogapi.com/v1/breeds')).data;
    const mappedApiData = cleanData(getApiData);
    return [...getDbData,...mappedApiData];
};

const searchDogByName = async (name) => {
    const DbDogs = await Dog.findAll({where:{ name }});
    const getApiData = (await axios.get('https://api.thedogapi.com/v1/breeds')).data;
    const mappedApiData = cleanData(getApiData);
    const ApiDogs = mappedApiData.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
    return [...DbDogs,...ApiDogs];
};

const createDog = async (name, min_height, max_height,
    min_weight, max_weight, life_span, temperaments, image) => {

        const fixedHeight = [];
        const minHeight = min_height;
        const maxHeight = max_height;
        fixedHeight.push(minHeight, maxHeight);
    
        const fixedWeight = [];
        const minWeight = min_weight;
        const maxWeight = max_weight;
        fixedWeight.push(minWeight, maxWeight);
    
        let newDog = await Dog.create({
        name,
        height: fixedHeight,
        weight: fixedWeight,
        life_span,
        image: image ? image : "https://illustoon.com/photo/dl/350.png",
        })
    
        let associatedTemp = await Temperament.findAll({
            where: { name: temperaments},
        })
    
        newDog.addTemperament(associatedTemp);
    
        return newDog;

}

module.exports = {
    createDog,
    getDogsById,
    searchDogByName, 
    getAllDogs
};
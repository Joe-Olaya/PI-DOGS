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
        console.log(orderDog);
        return orderDog
    } else {
        const dog = await Dog.findByPk(id,{
            include: [
                {
                    model: Temperament,
                    attributes: ['name'], 
                    through: {
                        attributes: [],
                    },
                }
            ]
        })

        let stringHeight = dog.height.join(' - ')
        let stringWeight = dog.weight.join(' - ')
        let temperamentArray = [];
        if (dog.temperaments) {
            let temperaments = dog.temperaments
            for (j of temperaments){
                temperamentArray.push(j.name)
            }
        };

        const orderDog = {
            id: dog.id,
            name: dog.name,
            life_span: dog.life_span,
            height : stringHeight,
            weight : stringWeight,
            temperament : temperamentArray,
            image: dog.image
        }
        console.log(orderDog)
        return orderDog
    }
}

const cleanApiData = (arr) => {
    dogsApi = [];
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
        dogsApi.push(
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
    return dogsApi
};

const cleanDbData = (arr) => {
    let dogsDb = [];
     arr.map((el) => {
        let temperamentArray = [];
        if (el.temperaments) {
            let temperaments = el.temperaments
            for (j of temperaments){
                temperamentArray.push(j.name)
            }
        };
        let heightArray = [];
        if (el.height) {
            heightArray = el.height;
        };
    
        let weightArray = [];
        if (el.weight) {
            weightArray = el.weight;
        };
        dogsDb.push(
            {
                id: el.id,
                name: el.name,
                height: heightArray,
                weight: weightArray,
                temperaments: temperamentArray,
                life_span: el.life_span,
                image: el.image,
                created : true
            }
        ) 
        
    });
    return dogsDb
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
    const mappedDbData = cleanDbData(getDbData);
    const mappedApiData = cleanApiData(getApiData);
    return [...mappedDbData,...mappedApiData];
};

const searchDogByName = async (name) => {
    const getDbDogs = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ['name'], 
            through: {
                attributes: [],
            },
        }
    });
    const mappetDbData = cleanDbData(getDbDogs);
    const dbDogs = mappetDbData.filter(d => d.name.toLowerCase().includes(name.toLowerCase()))
    const getApiData = (await axios.get('https://api.thedogapi.com/v1/breeds')).data;
    const mappedApiData = cleanApiData(getApiData);
    const ApiDogs = mappedApiData.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
    return [...dbDogs,...ApiDogs];
};

const createDog = async (name, min_height, max_height,
    min_weight, max_weight, life_span, temperaments, image) => {

        let fixedHeight = [];
        const minHeight = min_height;
        const maxHeight = max_height;
        fixedHeight.push(minHeight,maxHeight);
    
        let fixedWeight = [];
        const minWeight = min_weight;
        const maxWeight = max_weight;
        fixedWeight.push(minWeight,maxWeight);
        
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
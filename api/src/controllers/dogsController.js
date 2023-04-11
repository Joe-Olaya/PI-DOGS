const { Dog, Temperament } = require('../db');
const axios = require('axios');

const createDog = async(name, min_height, max_height,
    min_weight, max_weight, life_span, temperaments, image) => {

        const fixedHeight = []
        const minHeight = min_height;
        const maxHeight = max_height;
        fixedHeight.push(minHeight, maxHeight)
    
        const fixedWeight = []
        const minWeight = min_weight;
        const maxWeight = max_weight;
        fixedWeight.push(minWeight, maxWeight)
    
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

module.exports = {createDog};
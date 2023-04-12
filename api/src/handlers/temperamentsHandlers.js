const { Temperament } = require('../db');
const axios = require('axios');

const getTemperamentsHandler = async (req,res) => {
    try {
        const temperamentsApi = await axios.get("https://api.thedogapi.com/v1/breeds");
        const temperaments = temperamentsApi.data.map(t => t.temperament);
        const temps = temperaments.toString().split(",");
        temps.forEach(el => {
            let i = el.trim()
            Temperament.findOrCreate({
                 where: { name: i }
            })
        })
    
        const allTemp = await Temperament.findAll();    
        // res.send(allTemp);
        res.status(200).json(allTemp)
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports = {
    getTemperamentsHandler
}
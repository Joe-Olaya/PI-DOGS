const { Temperament } = require('../db');
const axios = require('axios');

let apiUrl = `https://api.thedogapi.com/v1/breeds`

const getTemperamentsHandler = async (req,res) => {
    const temperamentsApi = await axios.get(apiUrl);
    const temperaments = temperamentsApi.data.map(t => t.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach(el => {
        let i = el.trim()
        Temperament.findOrCreate({
             where: { name: i }
        })
    })

    const allTemp = await Temperament.findAll();    
    res.send(allTemp);
}

module.exports = {
    getTemperamentsHandler
}
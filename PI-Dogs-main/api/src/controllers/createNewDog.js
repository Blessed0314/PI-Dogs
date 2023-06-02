const { Dogs, Temperaments } = require("../db");
const { Op } = require('sequelize');
const axios  = require('axios');
const { API_URL,API_KEY } = process.env;
const getTemperamentsData = require('./getTemperamentsData');

const createNewDog = async(image,name,height,weight,lifeSpan,temperaments) => {
    
    const allTemperaments = await getTemperamentsData();
    
    const newDog = {
        image: image,
        name: name,
        height: `min ${height.min}cm, max ${height.max}cm`,
        weight: weight,
        lifeSpan: `${lifeSpan.min} - ${lifeSpan.max} years`,
        temperament: temperaments.join(", "),
        origin: "bdd"
    }

    const idTemp = await Temperaments.findAll({attributes:['id'],
    where:{name:{[Op.in]:temperaments}}}); //* Busca enla tabla temperaments los ID de los temperamentos del perro que ingresa por post y los devuelve en un array
    
    const createDog = await Dogs.create(newDog);
    await createDog.addTemperaments(idTemp);
    return createDog;
}

module.exports = createNewDog;
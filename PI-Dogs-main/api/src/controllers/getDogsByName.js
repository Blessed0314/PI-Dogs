const { Dogs, Temperaments } = require("../db");
const { Op } = require('sequelize');
const { API_URL,API_KEY } = process.env;
const axios = require('axios');
const { filterDogsData } = require('./filterApiData')

//* Este controller busca el id tanto en la API como en el BD
const getDogsByName = async(name) => {
    //*Buscamos en la Api
    const response = (await axios.get(`${API_URL}?${API_KEY}`)).data;       
    const dogsApi = filterDogsData(response);
    const filteredDogsApi = dogsApi.filter((dog) => {
        return dog.name.toLowerCase().startsWith(name.toLowerCase());
      });
    //* Buscamos en el BD
    const dogsBDdata = await Dogs.findAll({where:{name:{[Op.iLike]: `${name}%`}},include:{
      model: Temperaments,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    }});
    //* Se organizan los datos de los temperamentos en un string mediante esta función auxiliar
    const filteredDogsBD = dogsBDdata.map(dog => {
      const temperaments = dog.Temperaments.map(temp => temp.name);
      const allTemperaments = temperaments.join(', ');
      return {
        id: dog.id,
        name: dog.name,
        image: dog.image,
        weight: dog.weight,
        height: dog.height,
        lifeSpan: dog.lifeSpan,
        origin: dog.origin,
        temperament: allTemperaments} 
    }); 

    //*Se ordenan alfabeticamente
    const filterData = [...filteredDogsApi, ...filteredDogsBD];
    const allFilteredDogs = filterData.sort(function (prevDog, currDog){
      const namePrevDog = prevDog.name.toUpperCase();
      const nameCurrDog = currDog.name.toUpperCase();
      if (namePrevDog < nameCurrDog) return -1;
      if (namePrevDog > nameCurrDog) return 1;
      return 0;
  });
    
    return allFilteredDogs;
  }

module.exports = getDogsByName;
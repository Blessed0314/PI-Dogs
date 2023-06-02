const { Dogs, Temperaments } = require("../db");
const { API_URL,API_KEY } = process.env;
const axios = require('axios');
const { filterDogsData } = require('./filterApiData')

//* Este controller trae los datos desde la api y la BD para el homepage
const getDogsData = async() => {

  //* Se traen los datos de la BD con los temperaments de la tabla de relación
  const dogsBDdata = await Dogs.findAll({
    include:{
      model: Temperaments,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    }
  });
  //* Se organizan los datos de los temperamentos en un string mediante esta función auxiliar
  const dogsBD = dogsBDdata.map(dog => {
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

  //* Se traen los datos de la api
  const response = (await axios.get(`${API_URL}/?api_key=${API_KEY}`)).data;    
  //* Se filtran los datos que vienen de la api mediante una función auxiliar   
  const dogsApi = filterDogsData(response);

  //* Se une todo en un solo array
  const allData = [...dogsBD, ...dogsApi];
  
  //* Se ordena todos los datos por orden
  const allDogs = allData.sort(function (prevDog, currDog){
    const namePrevDog = prevDog.name.toUpperCase();
    const nameCurrDog = currDog.name.toUpperCase();
    if (namePrevDog < nameCurrDog) return -1;
    if (namePrevDog > nameCurrDog) return 1;
    return 0;
  });
  return allDogs;
}

module.exports = getDogsData;
const { Dogs, Temperaments } = require("../db");
const { API_URL,API_KEY } = process.env;
const axios = require('axios');
const { filterDogsData } = require('./filterApiData')

//* Este controller busca el id tanto en la API como en el BD
const getDogByID = async(source,id) => {
  //*Si source indica que la id es de la api, se valida que esta entre 1 y 264
  if (source === "api" && id <= 264 && id >= 1 && id != 20){
    const response = (await axios.get(`${API_URL}?${API_KEY}`)).data;
    const dogsApi = filterDogsData(response);
    const dog = dogsApi.find(dog => dog.id == id);
    if (dog) return dog;
  }
  //*Si source indica que la id es de la BD, se valida en esta.
  if (source === "bdd"){
    const dogBD = await Dogs.findOne({where:{id:id},include:{
      model: Temperaments,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    }});
    const temperaments = dogBD.Temperaments.map(temp => temp.name);
    const allTemperaments = temperaments.join(', ');
    const dog = {
      id: dogBD.id,
      name: dogBD.name,
      image: dogBD.image,
      weight: dogBD.weight,
      height: dogBD.height,
      lifeSpan: dogBD.lifeSpan,
      origin: dogBD.origin,
      temperament: allTemperaments} 
    if (dogBD) return dog;
  }
  //*En caso de que no cumpla la condición de la API o que la respuesta de BD sea null
  throw new Error("No hay razas con el id especificado");
}

module.exports = getDogByID;
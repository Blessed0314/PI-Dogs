const { Temperaments } = require("../db");
const { API_URL,API_KEY } = process.env;
const axios = require('axios');
const { filterTemperamentsData } = require('./filterApiData')

//* Este controller trae los datos desde la api y la BD para el homepage
const getTemperamentsData = async() => {
  const tempData = await Temperaments.findAll();
  if (tempData.length==0){
    const response = (await axios.get(`${API_URL}?apiKey=${API_KEY}`)).data;
    const data = filterTemperamentsData(response);
    const allTemperaments = await Temperaments.bulkCreate(data);
    return allTemperaments
  }
  return tempData;
}

module.exports = getTemperamentsData;
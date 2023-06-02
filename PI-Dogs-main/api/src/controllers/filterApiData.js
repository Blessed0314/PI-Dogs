//*Este es un controller auxiliar que limpia la data recibida por axios sacando
//*solo la información relevante.

const filterDogsData = (response) => {
  return response.map(dog =>{
    const [heightMin, heightMax] = dog.height.metric.split(" - ");
    let weight = [];
    //* Filtro para los perros que no poseen el peso en metric, se calcula a partir de su peso en imperial 
    if (dog.weight.metric !== "NaN") weight = dog.weight.metric.split(" - ");
    else weight = dog.weight.imperial.split(" – ").map(param => Math.round(parseInt(param) * 0.45));
    //* Filtro para los perros que solo poseen un dato en su peso, se les coloca ambos atributos con ese valor
    if(weight.length === 1) weight.push(parseInt(weight[0]) + 2);
    //* Filtro para los perros que solo poseen el peso máximo, 
    if(weight[0] === "NaN") weight[0] = weight[1] - 2;
    //* Filtro para los perros que no tienen temperamentos, se coloca No registra 

    return {
            id: dog.id,
            image: dog.image.url,
            name: dog.name,
            weight: {min: parseInt(weight[0]), max: parseInt(weight[1])},
            height: `min ${heightMin}cm, max ${heightMax}cm`,
            lifeSpan: dog.life_span,
            temperament: 'temperament' in dog ? dog.temperament : 'Not register',
            origin: "api"
          }
  });
}

const filterTemperamentsData = (response) => {
  const data = response.map((dog) => {return{temperament: dog.temperament}});
  return data
  .map(obj => obj.temperament)
  .filter(temperaments => temperaments != null)
  .map(temperaments=> temperaments.split(", "))
  .flat()
  .map((temperament) => ({ name: temperament.trim()}))
  .filter((temperament, index, self) => index === self.findIndex((t) => t.name === temperament.name));
} 

module.exports = { filterDogsData, filterTemperamentsData };
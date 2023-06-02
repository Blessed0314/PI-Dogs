const createNewDog = require('../controllers/createNewDog');
const { Dogs } = require("../db");
const { Op } = require('sequelize');

const newDog = async (req,res) => {
    const {image,name,height,weight,lifeSpan,temperaments} = req.body;

    //* Validamos que por body lleguen todos los valores solicitados
    if (!image||!name||!height||!weight||!lifeSpan||!temperaments)
        return res.status(400).json({error:'Faltan datos'});
    //* Validamos que name tenga solo letras
    if (!/^[a-zA-Z\s]+$/.test(name)) 
        return res.status(400).json({ error: 'El atributo name debe contener solo letras' });
    //* Validamos que image sea una url
    if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(image))
        return res.status(400).json({ error: 'El atributo image debe ser una url' });
    //* Validamos que height, weight y lifespan lleguen valores númericos.
    if (!(/^[0-9]+$/.test(height.min)&&/^[0-9]+$/.test(height.max)&&/^[0-9]+$/.test(weight.min)&&/^[0-9]+$/.test(weight.max)&&/^[0-9]+$/.test(lifeSpan.min)&&/^[0-9]+$/.test(lifeSpan.max)))
        return res.status(400).json({ error: 'Los atributos height, weight y lifeSpan deben ser numéricos' });
    //* Validamos que el el nombre del perro no exista en la base de datos
    if (await Dogs.findOne({where:{name:{[Op.iLike]: `${name}%`}}}))
        return res.status(400).json({error: 'Ya existe un perro con ese nombre en la base de datos'});

    try{
        const response = await createNewDog(image,name.trim(),height,weight,lifeSpan,temperaments);
        res.status(201).send("El perro se ha creado con éxito");
    }catch(error){
        res.status(404).json({error: "Error al conectarse al servidor"});
    }
}

module.exports = newDog;
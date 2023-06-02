const getTemperamentsData = require("../controllers/getTemperamentsData")


const allTemperaments = async(req,res) => {
    try {
        const response = await getTemperamentsData();
        //res.status(200).json({message:"Los temperamentos se cargaron con exito"});
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

module.exports = allTemperaments;
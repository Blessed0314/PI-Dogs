const getDogByID = require('../controllers/getDogByID')


const dogByID= async(req,res) => {
    const { id } = req.params;
    const source = isNaN(id) 
        ? "bdd"
        : "api";
    try {
        const response = await getDogByID(source,id);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}

module.exports = dogByID;
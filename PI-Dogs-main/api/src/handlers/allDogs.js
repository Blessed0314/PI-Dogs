const getDogsData = require('../controllers/getDogsData')
const getDogsByName = require ('../controllers/getDogsByName')


const allDogs = async(req,res) => {
    const { name } = req.query;
    try {
        const response = (name && /^[a-zA-Z\s]+$/.test(name))
        ? await getDogsByName(name)
        : await getDogsData();
    res.status(200).json(response);
    } catch (error) {
        res.status(404).json({message:error.message})
    }
}

module.exports = allDogs;
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dogs', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isUrl: {
          args: true,
          msg: "El valor ingresado no es una url"},
        notEmpty: true,}
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: {
          args: [3, 20],
          msg: "El nombre debe tener entre 3 y 20 caracteres"},
      notEmpty: true,}
    },
    height: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    lifeSpan: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len: {
        args: [3, 15],
        msg: "La esperanza de vida debe tener entre 3 y 15 caracteres"},
        notEmpty: true,}
    },
    
    origin:{
      type: DataTypes.STRING,
      allowNull: false,
    }
  },{ frezeeTableName: true, timestamps: false });
};

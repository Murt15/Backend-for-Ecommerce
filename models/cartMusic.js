const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const cartMusic=sequelize.define('cartMusic',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique:true,
      }


});


module.exports = cartMusic;
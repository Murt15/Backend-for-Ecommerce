const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const orderMusic=sequelize.define('orderMusic',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique:true,
      }


});


module.exports = orderMusic;
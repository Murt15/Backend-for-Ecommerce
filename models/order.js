const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const order=sequelize.define('order',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique:true,
      },
      totalPrice:{
        type: Sequelize.FLOAT,
        
      }


});


module.exports = order;
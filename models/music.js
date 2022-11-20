const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Music=sequelize.define('music',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    }


});

module.exports = Music;
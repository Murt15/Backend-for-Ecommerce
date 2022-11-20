const Sequelize = require('sequelize');

const sequelize = require('../utils/database');


const User=sequelize.define('user',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        unique:true,
      },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    emailid: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
    }


});


module.exports = User;
'use strict';
module.exports = function(sequelize, DataTypes) {
  var snip = sequelize.define('snip', {
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    notes: DataTypes.TEXT,
    language: DataTypes.STRING,
    tags: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return snip;
};
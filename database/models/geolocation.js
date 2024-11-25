const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('geolocation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    coordinates: {
      type: "POINT",
      allowNull: false
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'geolocation',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "geolocalisation_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

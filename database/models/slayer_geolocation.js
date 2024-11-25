const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('slayer_geolocation', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'slayer',
        key: 'id'
      }
    },
    geolocation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'geolocation',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'slayer_geolocation',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "slayer_geolocalisation_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
          { name: "geolocation_id" },
        ]
      },
    ]
  });
};

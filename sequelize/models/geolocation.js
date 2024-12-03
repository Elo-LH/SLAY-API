const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'geolocation',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'geolocation',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'geolocalisation_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  )
}

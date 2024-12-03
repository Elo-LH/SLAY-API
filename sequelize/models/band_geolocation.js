const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'band_geolocation',
    {
      band_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'band',
          key: 'id',
        },
      },
      geolocation_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'geolocation',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'band_geolocation',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'band_geolocalisation_pkey',
          unique: true,
          fields: [{ name: 'band_id' }, { name: 'geolocation_id' }],
        },
      ],
    }
  )
}

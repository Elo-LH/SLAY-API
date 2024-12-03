const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'sound_band',
    {
      sound_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'sound',
          key: 'id',
        },
      },
      band_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'band',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'sound_band',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'sound_band_pkey',
          unique: true,
          fields: [{ name: 'sound_id' }, { name: 'band_id' }],
        },
      ],
    }
  )
}

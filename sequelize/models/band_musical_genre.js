const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'band_musical_genre',
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
      musical_genre_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'musical_genre',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'band_musical_genre',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'band_musical_genre_pkey',
          unique: true,
          fields: [{ name: 'band_id' }, { name: 'musical_genre_id' }],
        },
      ],
    }
  )
}

const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'sound_artist',
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
      artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'artist',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'sound_artist',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'sound_artist_pkey',
          unique: true,
          fields: [{ name: 'sound_id' }, { name: 'artist_id' }],
        },
      ],
    }
  )
}

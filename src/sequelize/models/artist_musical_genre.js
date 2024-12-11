const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'artist_musical_genre',
    {
      artist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'artist',
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
      tableName: 'artist_musical_genre',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'artist_musical_genre_pkey',
          unique: true,
          fields: [{ name: 'artist_id' }, { name: 'musical_genre_id' }],
        },
      ],
    }
  )
}

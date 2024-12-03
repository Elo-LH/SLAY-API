const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'musicalGenre',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: 'musical_genre_id_key',
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'musical_genre_name_key',
      },
    },
    {
      sequelize,
      tableName: 'musical_genre',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'musical_genre_id_key',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'musical_genre_name_key',
          unique: true,
          fields: [{ name: 'name' }],
        },
        {
          name: 'musical_genre_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  )
}

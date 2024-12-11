const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'sound',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      audio: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      is_by_band: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      album_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: 'album',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'sound',
      schema: 'public',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          name: 'sound_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  )
}

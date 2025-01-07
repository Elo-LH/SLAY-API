const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'slayer_like_sound',
    {
      slayer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'slayer',
          key: 'id',
        },
      },
      sound_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'sound',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      tableName: 'slayer_like_sound',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'slayer_like_sound_pkey',
          unique: true,
          fields: [{ name: 'slayer_id' }, { name: 'sound_id' }],
        },
      ],
    }
  )
}

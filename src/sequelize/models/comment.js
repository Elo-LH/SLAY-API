const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'comment',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      author_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'slayer',
          key: 'id',
        },
      },
      sound_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'sound',
          key: 'id',
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'comment',
      schema: 'public',
      timestamps: true,
      underscored: true,
      indexes: [
        {
          name: 'comment_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  )
}

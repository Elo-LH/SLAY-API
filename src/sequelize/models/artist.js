const Sequelize = require('sequelize')
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'artist',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      slayer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'slayer',
          key: 'id',
        },
        unique: 'artist_slayer_id_key',
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'artist_name_key',
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      link_1: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      link_2: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      link_3: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      skill_level: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'artist',
      schema: 'public',
      timestamps: false,
      underscored: true,
      indexes: [
        {
          name: 'artist_name_key',
          unique: true,
          fields: [{ name: 'name' }],
        },
        {
          name: 'artist_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
        {
          name: 'artist_slayer_id_key',
          unique: true,
          fields: [{ name: 'slayer_id' }],
        },
      ],
    }
  )
}

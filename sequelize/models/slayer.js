const Sequelize = require('sequelize')

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'slayer',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'user_email_key',
      },
      pseudo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'user_name_key',
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      avatar: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      role: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'USER',
      },
      pronouns: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      is_searching: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: 'slayer',
      schema: 'public',
      timestamps: false,
      indexes: [
        {
          name: 'user_email_key',
          unique: true,
          fields: [{ name: 'email' }],
        },
        {
          name: 'user_name_key',
          unique: true,
          fields: [{ name: 'pseudo' }],
        },
        {
          name: 'user_pkey',
          unique: true,
          fields: [{ name: 'id' }],
        },
      ],
    }
  )
}

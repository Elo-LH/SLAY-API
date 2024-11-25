const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('band', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "band_name_key"
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mail: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    link_1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    link_2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    link_3: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'band',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "band_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "band_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('instrument', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: "instrument_name_key"
    }
  }, {
    sequelize,
    tableName: 'instrument',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "instrument_name_key",
        unique: true,
        fields: [
          { name: "name" },
        ]
      },
      {
        name: "instrument_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

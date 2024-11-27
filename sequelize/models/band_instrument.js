const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('band_instrument', {
    band_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'band',
        key: 'id'
      }
    },
    instrument_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'instrument',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'band_instrument',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "band_instrument_pkey",
        unique: true,
        fields: [
          { name: "band_id" },
          { name: "instrument_id" },
        ]
      },
    ]
  });
};

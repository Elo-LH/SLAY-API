const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('slayer_search_instrument', {
    slayer_search_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'slayer_search',
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
    tableName: 'slayer_search_instrument',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "slayer_search_instrument_pkey",
        unique: true,
        fields: [
          { name: "slayer_search_id" },
          { name: "instrument_id" },
        ]
      },
    ]
  });
};

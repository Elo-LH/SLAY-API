const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('artist_instrument', {
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'artist',
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
    tableName: 'artist_instrument',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "artist_instrument_pkey",
        unique: true,
        fields: [
          { name: "artist_id" },
          { name: "instrument_id" },
        ]
      },
    ]
  });
};

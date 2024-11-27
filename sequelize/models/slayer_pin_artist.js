const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('slayer_pin_artist', {
    slayer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'slayer',
        key: 'id'
      }
    },
    artist_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'artist',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'slayer_pin_artist',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "slayer_pinned_artists_pkey",
        unique: true,
        fields: [
          { name: "slayer_id" },
          { name: "artist_id" },
        ]
      },
    ]
  });
};

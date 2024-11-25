const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('slayer_search_musical_genre', {
    slayer_search_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'slayer_search',
        key: 'id'
      }
    },
    musical_genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'musical_genre',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'slayer_search_musical_genre',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "slayer_search_musical_genre_pkey",
        unique: true,
        fields: [
          { name: "slayer_search_id" },
          { name: "musical_genre_id" },
        ]
      },
    ]
  });
};

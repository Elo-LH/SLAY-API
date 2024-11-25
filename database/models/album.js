const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('album', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cover: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    released_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'album',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "album_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

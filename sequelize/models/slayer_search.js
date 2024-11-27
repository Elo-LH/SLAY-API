const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('slayer_search', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    slayer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'slayer',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    radius: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    skill_level: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'slayer_search',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "slayer_search_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

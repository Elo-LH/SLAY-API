const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('slayer_follow', {
    slayer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'slayer',
        key: 'id'
      }
    },
    followed_slayer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'slayer',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'slayer_follow',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "slayer_follow_pkey",
        unique: true,
        fields: [
          { name: "slayer_id" },
          { name: "followed_slayer_id" },
        ]
      },
    ]
  });
};

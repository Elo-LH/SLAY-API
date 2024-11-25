const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('private_message', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'slayer',
        key: 'id'
      }
    },
    recipient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'slayer',
        key: 'id'
      }
    },
    sent_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    received_at: {
      type: DataTypes.DATE,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'private_message',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "private_message_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};

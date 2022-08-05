const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create Comment model
class Comment extends Model {}



Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true

            }
        },

        comment_entry: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },

        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },

    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
)


module.exports = Comment;
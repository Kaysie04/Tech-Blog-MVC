const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// CREATE COMMENT MODEL
class Comment extends Model {}


// CREATE COLUMNS FOR COMMENT MODEL
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        // title: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     validate: {
        //         notEmpty: true

        //     }
        // },

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
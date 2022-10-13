import { DataTypes, Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config()


export const database = new Sequelize(
    process.env.DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: process.env.DB_HOST || 'localhost',
})


export const Anekdot = database.define('anek', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    cat: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false
})
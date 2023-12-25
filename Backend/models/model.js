import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/db.sqlite3'
})

const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    country: DataTypes.STRING,
    admin: DataTypes.BOOLEAN,
})

export const API = sequelize.define('API', {
    apiKey: DataTypes.INTEGER,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

User.hasOne(API, {
    foreignKey: 'userId'
})

API.belongsTo(User, {
    foreignKey: 'userId'
})

sequelize.sync();

export default User

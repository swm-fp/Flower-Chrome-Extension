import mysql from "mysql2"
import Sequelize from "sequelize"

let createDB = async (config) => {
    let connection = await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
    }).promise();
    await connection.query(`DROP DATABASE IF EXISTS ${config.database};`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${config.database};`);
    await connection.close();
};

let getSequelize = (config) => {
        return new Sequelize(config.database, config.user, config.password, {
            host: config.host,
            dialect: config.dialect
        });
}
export { createDB ,getSequelize};
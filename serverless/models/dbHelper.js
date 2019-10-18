import mysql from "mysql2"
import Sequelize from "sequelize"

import UserModel from "./UserModel"
import MemoModel from "./MemoModel"
import UserMemoModel from "./UserMemoModel"


let sequelize = undefined;

export async function createDB(config) {
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


export async function connect(config) {
    sequelize = new Sequelize(config.database, config.user, config.password, {
        host: config.host,
        dialect: config.dialect
    });
    await sequelize.authenticate();
    return sequelize;
};

export async function disconnect() {
    await sequelize.close();
}

export async function migrate() {
    UserModel.init(sequelize);
    MemoModel.init(sequelize);
    UserMemoModel.init(sequelize);
    MemoModel.hasMany(UserMemoModel, { foreignKey: "memoId", sourceKey: "memoId" });
    UserModel.hasMany(UserMemoModel, { foreignKey: "userId", sourceKey: "userId" });
    UserMemoModel.belongsTo(UserModel, { foreignKey: "userId" });
    UserMemoModel.belongsTo(MemoModel, { foreignKey: "memoId" });
    
    await sequelize.sync();
}
import mysql from "mysql2"
import Sequelize from "sequelize"
import UserModel from "./UserModel"
import MemoModel from "./MemoModel"
import UserMemoModel from "./UserMemoModel"

export class DbHelper {
    constructor() {
        this.sequelize;
        this.userDao;
        this.memoDao;
        this.userMemoDao;
    }
    async createDB(config) {
        let connection = await mysql.createConnection({
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.password,
        }).promise();
        await connection.query(`DROP DATABASE IF EXISTS ${config.database};`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${config.database};`);
        await connection.close();
    }
    async connect(config) {
        this.sequelize = new Sequelize(config.database, config.user, config.password, {
            host: config.host,
            dialect: config.dialect,
            dialectModule: mysql,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        await this.sequelize.authenticate();
    };

    async disconnect() {
        await this.sequelize.close();
    }

    init() {
        this.userDao = UserModel.init(this.sequelize);
        this.memoDao = MemoModel.init(this.sequelize);
        this.userMemoDao = UserMemoModel.init(this.sequelize);

        MemoModel.hasMany(UserMemoModel, { foreignKey: "memoId", sourceKey: "memoId" });
        UserModel.hasMany(UserMemoModel, { foreignKey: "userId", sourceKey: "userId" });
        UserMemoModel.belongsTo(UserModel, { foreignKey: "userId" });
        UserMemoModel.belongsTo(MemoModel, { foreignKey: "memoId" });
    }

    async migrate(force) {
        if (force == true) {
            await this.sequelize.sync({ force: true });
        }
        else {
            await this.sequelize.sync();
        }
    }

    getUserDao() {
        return this.userDao;
    }
    getMemoDao() {
        return this.memoDao;
    }
    getUserMemoDao() {
        return this.userMemoDao;
    }
}






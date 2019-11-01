import chai, { expect } from "chai"
import "@babel/polyfill"
import config from "../config/config"
import * as DBHelper from "../models/dbHelper"


let dbHelper;
describe("DB Migrate", async () => {
    it("migrate", async () => {
        dbHelper = new DBHelper.DbHelper();
        await dbHelper.createDB(config.development);
        await dbHelper.connect(config.development);
        dbHelper.init();
        await dbHelper.migrate(true);
    });
});

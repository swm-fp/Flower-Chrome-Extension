import "@babel/polyfill"
import config from "../config/config"
import * as dbHelper from "../models/dbHelper"

describe("Sequelize Test", function () {
    before(async () => {
        await dbHelper.createDB(config.test);
    });

    it("Connection Test", async function () {
        await (async () => {
            await dbHelper.connect(config.test);
            await dbHelper.disconnect();
        })();

    });
});

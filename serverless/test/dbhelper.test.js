import "@babel/polyfill"
import config from "../config/config"
import { createDB, getSequelize } from "./dbHelper"

let sequelize;
describe("Sequelize Test", function () {

    before(async () => {
        await createDB(config.test);
        sequelize = getSequelize(config.test);
    });

    it("Connection Test", async function () {
        await (async () => {
            await sequelize.authenticate();
            await sequelize.close();
        })();

    });
});

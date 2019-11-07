import chai, { expect } from "chai"
import "@babel/polyfill"
import model from "../../models/UserModel"
import config from "../../config/config"
import * as dbHelper from "../../models/dbHelper"

let sequelize;
let dao;
describe("Sequelize Test", function () {

    before(async () => {
        await dbHelper.createDB(config.test);
        sequelize = await dbHelper.connect(config.test);
        await dbHelper.migrate();
        
        dao = model.init(sequelize);
    });

    after(async () => {
        await dbHelper.disconnect();
    });

    it("insert Test", async function () {
        let userId = "hello";
        let item = await dao.create({ userId: userId });
        expect(item.userId).to.equal(userId);
    });
});

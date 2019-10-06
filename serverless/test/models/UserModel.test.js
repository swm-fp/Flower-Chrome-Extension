import chai, { expect } from "chai"
import "@babel/polyfill"
import model from "../../models/UserModel"
import config from "../../config/config"
import { createDB, getSequelize } from "../../models/dbHelper"

let sequelize;
let dao;
describe("Sequelize Test", function () {

    before(async () => {
        await createDB(config.test);
        sequelize = getSequelize(config.test);
        await sequelize.authenticate();
        dao = model.init(sequelize);
        await dao.sync({ force: true });
    });

    after(async () => {
        await sequelize.close();
    });

    it("insert Test", async function () {
        let userId = "hello";
        let item = await dao.create({ userId: userId });
        expect(item.userId).to.equal(userId);
    });
});

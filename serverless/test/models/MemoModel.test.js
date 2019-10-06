import chai, { expect } from "chai"
import "@babel/polyfill"
import model from "../../models/MemoModel"
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
        //when
        let url = "https://www.naver.com";
        let content = "hello im memo";
        let item = await dao.create({ content: content, url: url });

        //then
        expect(item.url).to.equal(url);
        expect(item.content).to.equal(content);
    });

    it("upsert Test", async function () {
        //given
        let url = "google.com";
        let content = "hello im memo";
        let item = await dao.create({ content: content, url: url });

        //insert
        let memoId = item.memoId;
        item = await dao.findByPk(memoId);

        let plainData = item.get({ plain: true });


        //when
        let changedUrl = "kakao.com";
        let changedContent = "hello kakao";
        plainData.url = changedUrl;
        plainData.content = changedUrl;
        await dao.upsert(plainData);

        //then
        item = await dao.findByPk(memoId);
        expect(item.url).to.equal(changedUrl);
        expect(item.content).to.equal(changedUrl);
    });
});

import chai, { expect } from "chai"
import "@babel/polyfill"
import config from "../config/config"
import * as dbHelper from "../models/dbHelper"
import UserModel from "../models/UserModel"
import MemoModel from "../models/MemoModel"
import UserMemoModel from "../models/UserMemoModel"

let sequelize;
let userDao;
let memoDao;
let userMemoDao;

describe("Sequelize Test", function () {

    before(async () => {
        await dbHelper.createDB(config.test);
        sequelize = await dbHelper.connect(config.test);
        await dbHelper.migrate();

        userDao = UserModel.init(sequelize);
        memoDao = MemoModel.init(sequelize);
        userMemoDao = UserMemoModel.init(sequelize);
    });

    after(async () => {
        dbHelper.disconnect();
    });

    it("should join", async () => {
        let user;
        let memo;
        let userMemo;

        user = await userDao.create({ userId: "bhw" });
        for (let i = 0; i < 2; i++) {
            memo = await memoDao.create({ content: "hello bhw" + i, url: "https://www.naver.com" });
            userMemo = await userMemoDao.create({ userId: user.userId, memoId: memo.memoId });
        }

        let items = await userDao.findAll({ include: [{ model: UserMemoModel, include: [{ model: MemoModel }] }] });
        console.log(JSON.stringify(items[0]));
    });
});
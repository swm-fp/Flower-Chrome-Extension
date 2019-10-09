import chai, { expect } from "chai"
import "@babel/polyfill"

import config from "../../../config/config"
import * as dbHelper from "../../../models/dbHelper"

import UserModel from "../../../models/UserModel"
import MemoModel from "../../../models/MemoModel"
import UserMemoModel from "../../../models/UserMemoModel"

import rewire from "rewire"
const get = rewire("../../../src/memos/get");
const post = rewire("../../../src/memos/post");


describe("Memo Get Test", function () {

    let sequelize;
    let userDao;
    let memoDao;
    let  userMemoDao;
    let user;

    before(async () => {
        await dbHelper.createDB(config.test);
        sequelize = await dbHelper.connect(config.test);
        await dbHelper.migrate();

        userDao = UserModel.init(sequelize);
        memoDao = MemoModel.init(sequelize);
        userMemoDao = UserMemoModel.init(sequelize);

        //mock connection
        get.__set__("dbHelper", {
            connect: () => {
                return sequelize;
            },
            disconnect: () => { }
        });

        post.__set__("dbHelper", {
            connect: () => {
                return sequelize;
            },
            disconnect: () => { }
        });

    });

    after(async () => {
        await sequelize.close();
    });

    beforeEach(async () => {
        await dbHelper.migrate(true);
        user = await userDao.create({ userId: "bhw" });

    });
    it("should get site's memos", async function () {
        //given 
        const url = "google.com";
        const memoList = [{ content: "this is memo", url: url }];
        await post.memos(user.userId, memoList);

        //when
        const selectedMemos = await get.memos(user.userId,url);


        //then
        expect(selectedMemos.length).to.equal(memoList.length);
    });
});

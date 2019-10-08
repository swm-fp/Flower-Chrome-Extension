import chai, { expect } from "chai"
import "@babel/polyfill"
import config from "../../../config/config"
import * as dbHelper from "../../../models/dbHelper"

import UserModel from "../../../models/UserModel"
import MemoModel from "../../../models/MemoModel"
import UserMemoModel from "../../../models/UserMemoModel"

import rewire from "rewire"
const post = rewire("../../../src/memos/post");

let sequelize;
let userDao;
let memoDao;
let userMemoDao;

describe("Memos Post Test", function () {
    before(async () => {
        await dbHelper.createDB(config.test);


        sequelize = await dbHelper.connect(config.test);
        await dbHelper.migrate();

        userDao = UserModel.init(sequelize);
        memoDao = MemoModel.init(sequelize);
        userMemoDao = UserMemoModel.init(sequelize);



        //mock connection
        post.__set__("dbHelper", {
            connect: () => {
                return sequelize;
            },
            disconnect : () =>{}
        });

        

    });

    after(async () => {
        await sequelize.close();
    });

    describe("Insert Test", async () => {

        let user;
        beforeEach(async () => {
            await dbHelper.migrate(true);
            user = await userDao.create({ userId: "bhw" });
        });

        it("should insert new memo", async () => {
            //when
            const memos = [{ content: "memo1", url: "google.com" }, { content: "memo2", url: "google.com" }];
            const memosLength = memos.length;
            await post.memos(user.userId, memos);

            //then
            const userMemoCount = await userMemoDao.count();
            const memoCount = await memoDao.count();

            expect(userMemoCount).to.equal(memosLength);
            expect(memoCount).to.equal(memosLength);
        });

        it("should update memo", async () => {

            // given
            const memos = [{ content: "memo1", url: "google.com" }, { content: "memo2", url: "google.com" }];
            await post.memos(user.userId, memos);



            //when
            const allMemos = await memoDao.findAll();
            const memo1 = allMemos[0].get({ plain: true });
            const memo2 = allMemos[1].get({ plain: true });
            memo1.content = "modify";
            memo2.content = "modify";

            await post.memos(user.userId, [memo1, memo2]);

            //then
            const userMemoCount = await userMemoDao.count();
            const memoCount = await memoDao.count();

            expect(memos.length).to.equal(userMemoCount);
            expect(memos.length).to.equal(memoCount);
        });
    });
});

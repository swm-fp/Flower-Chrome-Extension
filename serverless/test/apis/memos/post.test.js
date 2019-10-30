import chai, { expect } from "chai"
import "@babel/polyfill"
import config from "../../../config/config"
import * as DBHelper from "../../../models/dbHelper"

import * as post from "../../../src/memos/post"

let userDao;
let memoDao;
let userMemoDao;
let dbHelper;

describe("Memos Post Test", function () {
    before(async () => {
        dbHelper = new DBHelper.DbHelper();
        await dbHelper.createDB(config.test);
        await dbHelper.connect(config.test);
        dbHelper.init();
        await dbHelper.migrate();

        userDao = dbHelper.getUserDao();
        memoDao = dbHelper.getMemoDao();
        userMemoDao = dbHelper.getUserMemoDao();
    });

    after(async () => {
        dbHelper.disconnect();
    });

    describe("Insert Test", async () => {

        let user;
        beforeEach(async () => {
            await dbHelper.migrate(true);
        });

        it("should insert new memo with not registered user", async () => {

            //given
            //not registerd user
            user = { userId: "bhw" };

            //when
            const memos = [{ content: "memo1", url: "google.com" }, { content: "memo2", url: "google.com" }];
            const memosLength = memos.length;
            await post.memos(dbHelper,user.userId, memos);

            //then
            const userMemoCount = await userMemoDao.count();
            const memoCount = await memoDao.count();

            expect(userMemoCount).to.equal(memosLength);
            expect(memoCount).to.equal(memosLength);

        });

        it("should insert new memo", async () => {
            //given
            user = await userDao.create({ userId: "bhw" });

            //when

            const memos = [{ content: "memo1", url: "google.com" }, { content: "memo2", url: "google.com" }];
            const memosLength = memos.length;
            await post.memos(dbHelper,user.userId, memos);

            //then
            const userMemoCount = await userMemoDao.count();
            const memoCount = await memoDao.count();

            expect(userMemoCount).to.equal(memosLength);
            expect(memoCount).to.equal(memosLength);
        });

        it("should update memo", async () => {

            // given
            user = await userDao.create({ userId: "bhw" });

            const memos = [{ content: "memo1", url: "google.com" }, { content: "memo2", url: "google.com" }];
            await post.memos(dbHelper,user.userId, memos);



            //when
            const allMemos = await memoDao.findAll();
            const memo1 = allMemos[0].get({ plain: true });
            const memo2 = allMemos[1].get({ plain: true });
            memo1.content = "modify";
            memo2.content = "modify";

            await post.memos(dbHelper,user.userId, [memo1, memo2]);

            //then
            const userMemoCount = await userMemoDao.count();
            const memoCount = await memoDao.count();

            expect(memos.length).to.equal(userMemoCount);
            expect(memos.length).to.equal(memoCount);
        });
    });
});

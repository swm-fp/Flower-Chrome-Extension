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
            const memos = [{ content: "memo1", url: "google.com" ,positionLeft : "10px", positionTop : "10px"}, { content: "memo2", url: "google.com" ,positionLeft : "10px", positionTop : "10px"}];
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

            const memos = [{ content: "memo1", url: "google.com" ,positionLeft : "10px", positionTop : "10px"}, { content: "memo2", url: "google.com" ,positionLeft : "10px", positionTop : "10px"}];
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

            const memos = [{ content: "memo1", url: "google.com" ,positionLeft : "10px", positionTop : "10px"}];
            await post.memos(dbHelper,user.userId, memos);



            //when
            let allMemos = await memoDao.findAll();
            let memo = allMemos[0].get({ plain: true });
            const modifiedContent = "modify";
            memo.content = modifiedContent;

            await post.memos(dbHelper,user.userId, [memo]);

            //then
            allMemos = await memoDao.findAll();
            memo = allMemos[0].get({ plain: true });


            expect(memo.content).to.equal(modifiedContent);
        });
    });
});

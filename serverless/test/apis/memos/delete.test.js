import chai, { expect } from "chai"

import config from "../../../config/config"
import * as DBHelper from "../../../models/dbHelper"


import * as get from "../../../src/memos/get"
import * as post from "../../../src/memos/post"
import * as deleteMethod from "../../../src/memos/delete"

import UserAPI from "../../../src/users/UserAPI"



describe("Memo Delete Test", function () {

    let userDao;
    let memoDao;
    let  userMemoDao;
    let user;
    let dbHelper;

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
        await dbHelper.disconnect();
    });

    beforeEach(async () => {
        await dbHelper.migrate(true);
        user = await UserAPI.createUser(dbHelper,"bhw");
    });


    it("should delete memo using memoId",async function(){
        //given 
        const url = "google.com";
        let memoList = [{ content: "this is memo", url: url ,positionLeft:"10px",positionTop:"10px"}];
        await post.memos(dbHelper,user.userId, memoList);

        //when
        let memo = await get.memos(dbHelper,user.userId);
        memo = memo[0];

        await deleteMethod.memos(dbHelper,user.userId,memo.memoId);

        //then
        const selectedMemos = await get.memos(dbHelper,user.userId);
        expect(selectedMemos.length).to.equal(0);
    });
    it("should not delete other's memo ",async function(){
        //given 
        const otherUser = await UserAPI.createUser(dbHelper,"other")

        const url = "google.com";
        let memoList = [{ content: "this is memo", url: url ,positionLeft:"10px",positionTop:"10px"}];
        await post.memos(dbHelper,otherUser.userId, memoList);

        //when
        let memo = await get.memos(dbHelper,otherUser.userId);
        memo = memo[0];

        await deleteMethod.memos(dbHelper,user.userId,memo.memoId);

        //then
        const selectedMemos = await get.memos(dbHelper,otherUser.userId);
        expect(selectedMemos.length).to.equal(1);
    });
});

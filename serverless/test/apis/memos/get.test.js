import chai, { expect } from "chai"
import "@babel/polyfill"

import config from "../../../config/config"
import * as DBHelper from "../../../models/dbHelper"


import * as get from "../../../src/memos/get"
import * as post from "../../../src/memos/post"

import UserAPI from "../../../src/users/UserAPI"

describe("Memo Get Test", function () {

    let userDao;
    let memoDao;
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
    });

    after(async () => {
        await dbHelper.disconnect();
    });

    beforeEach(async () => {
        await dbHelper.migrate(true);
        user = await UserAPI.createUser(dbHelper,"bhw");
    });

    it("should have correct property",async function(){
        //given 
        const url = "google.com";
        const memoList = [{ content: "this is memo", url: url ,positionLeft:"10px",positionTop:"10px"}];
        await post.memos(dbHelper,user.userId, memoList);

        //when
        const selectedMemos = await get.memos(dbHelper,user.userId);

        //then
        const selectedMemo = selectedMemos[0];
        expect(selectedMemo).to.have.property("url");
        expect(selectedMemo).to.have.property("memoId");
        expect(selectedMemo).to.have.property("content");
        
    });

    it("should get every memos by userId",async function(){
        //given 
        const url = "google.com";
        const memoList = [{ content: "this is memo", url: url ,positionLeft:"10px",positionTop:"10px"}];
        await post.memos(dbHelper,user.userId, memoList);

        //when
        const selectedMemos = await get.memos(dbHelper,user.userId);

        //then
        expect(selectedMemos.length).to.equal(memoList.length);
    });

    it("should get site's memos", async function () {
        //given 
        const url1 = "google.com";
        const url2 = "naver.com";
        const requestUrl = "naver.com";
        const memoList = [{ content: "this is memo", url: url1,positionLeft:"10px",positionTop:"10px" },{ content: "this is memo", url: url2 ,positionLeft:"10px",positionTop:"10px"}];
        await post.memos(dbHelper,user.userId, memoList);

        //when
        const selectedMemos = await get.memos(dbHelper,user.userId,requestUrl);

        //then
        expect(selectedMemos.length).to.equal(1);
    });
});

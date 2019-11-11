import chai, { expect } from "chai"
import "@babel/polyfill"

import config from "../../../config/config"
import * as DBHelper from "../../../models/dbHelper"

import UserAPI from "../../../src/users/UserAPI"
import MemoAPI from "../../../src/memos/MemoAPI"

describe("MemoAPI Test", function () {

    let dbHelper;
    let userDao;
    let memoDao;
    let projectDao;
    let projectUserDao;

    let user;
    
    
    before(async () => {
        
        dbHelper = new DBHelper.DbHelper();
        await dbHelper.createDB(config.test);
        await dbHelper.connect(config.test);
        dbHelper.init();
        await dbHelper.migrate();
        
        userDao = dbHelper.getUserDao();
        memoDao = dbHelper.getMemoDao();
        projectDao = dbHelper.getProjectDao();
        projectUserDao = dbHelper.getProjectUserDao();
    });
    
    after(async () => {
        await dbHelper.disconnect();
    });
    
    beforeEach(async () => {
        await dbHelper.migrate(true);
        user = await UserAPI.createUser(dbHelper,"bhw");
    });
    
    describe("save Test", function () {
        it("should insert new memo", async () => {
            //given
            
            //when
            
            const memoList = [{ content: "memo1", url: "google.com" ,positionLeft : "10px", positionTop : "10px"}, { content: "memo2", url: "google.com" ,positionLeft : "10px", positionTop : "10px"}];
            
            await MemoAPI.saveMemoList(dbHelper,user.userId,memoList);
            
            //then
            const memoCount = await memoDao.count();
            
            expect(memoCount).to.equal(memoList.length);
        });
        
        it("should update memo", async () => {
            // given
            const memoList = [{ content: "memo1", url: "google.com" ,positionLeft : "10px", positionTop : "10px"}];
            await MemoAPI.saveMemoList(dbHelper,user.userId, memoList);
            
            //when
            let allMemoList = await memoDao.findAll();
            let memo = allMemoList[0].get({ plain: true });
            const modifiedContent = "modify";
            memo.content = modifiedContent;
            
            await MemoAPI.saveMemoList(dbHelper,user.userId, [memo]);
            
            //then
            allMemoList = await memoDao.findAll();
            memo = allMemoList[0].get({ plain: true });
            
            
            expect(memo.content).to.equal(modifiedContent);
        });
    });
    describe("read memo Test",async function(){
        it("should have correct property",async function(){
            //given 
            const url = "google.com";
            const memoList = [{ content: "this is memo", url: url ,positionLeft:"10px",positionTop:"10px"}];
            await MemoAPI.saveMemoList(dbHelper,user.userId, memoList);
            
            //when
            const selectedMemoList = await MemoAPI.readMemoList(dbHelper,user.userId);
            
            //then
            const selectedMemo = selectedMemoList[0];
            expect(selectedMemo).to.have.property("url");
            expect(selectedMemo).to.have.property("memoId");
            expect(selectedMemo).to.have.property("content");
            
        });
        
        it("should get every memos by userId",async function(){
            //given 
            const url = "google.com";
            const memoList = [{ content: "this is memo", url: url ,positionLeft:"10px",positionTop:"10px"},{ content: "this is memo", url: url ,positionLeft:"10px",positionTop:"10px"}];
            await MemoAPI.saveMemoList(dbHelper,user.userId, memoList);
            
            //when
            const selectedMemoList = await MemoAPI.readMemoList(dbHelper,user.userId);
            
            //then
            expect(selectedMemoList.length).to.equal(memoList.length);
        });
        
        it("should get site's memos", async function () {
            //given 
            const url1 = "google.com";
            const url2 = "naver.com";
            const requestUrl = "naver.com";
            const memoList = [{ content: "this is memo", url: url1,positionLeft:"10px",positionTop:"10px" },{ content: "this is memo", url: url2 ,positionLeft:"10px",positionTop:"10px"}];
            await MemoAPI.saveMemoList(dbHelper,user.userId, memoList);
            
            //when
            const selectedMemoList = await MemoAPI.readMemoList(dbHelper,user.userId,requestUrl);
            
            //then
            expect(selectedMemoList.length).to.equal(1);
        });
    })
    
    
    describe("delete memo Test", function () {
        it("should delete memo using memoId",async function(){
            //given 
            const url = "google.com";
            let memoList = [{ content: "this is memo", url: url ,positionLeft:"10px",positionTop:"10px"}];
            await MemoAPI.saveMemoList(dbHelper,user.userId, memoList);
            
            //when
            let allMemoList = await MemoAPI.readMemoList(dbHelper,user.userId);
            let memo = allMemoList[0];
            
            await MemoAPI.deleteMemo(dbHelper,user.userId,memo.memoId);
            
            //then
            const selectedMemos = await MemoAPI.readMemoList(dbHelper,user.userId);
            expect(selectedMemos.length).to.equal(0);
        });
        it("should not delete other's memo ",async function(){
            //given 
            const otherUser = await UserAPI.createUser(dbHelper,"other")
            
            const url = "google.com";
            let memoList = [{ content: "this is memo", url: url ,positionLeft:"10px",positionTop:"10px"}];
            await MemoAPI.saveMemoList(dbHelper,otherUser.userId, memoList);
            
            //when
            let allMemoList = await MemoAPI.readMemoList(dbHelper,otherUser.userId);
            let memo = allMemoList[0];
            
            await MemoAPI.deleteMemo(dbHelper,user.userId,memo.memoId);
            
            //then
            const selectedMemoList = await MemoAPI.readMemoList(dbHelper,otherUser.userId);
            expect(selectedMemoList.length).to.equal(1);
        });
    });
});

import chai, { expect } from "chai"
import sinon from "sinon"
import "@babel/polyfill"

import config from "../../../config/config"

import * as DBHelper from "../../../models/dbHelper"
import tokenDecoder from "../../../src/utils/tokenDecoder"

import rewire from "rewire"
const handler = rewire("../../../src/memos/handler");
const mockDbHelper = rewire("../../../models/dbHelper");
describe("Memo Handler Test", function () {

    let dbHelper;
    let userDao;
    let user;
    const accessToken = "eyJraWQiOiJuWE1ncjRUdXQwMXc4c0lFUkkxRFJZUmQ4bDBrcEhlc2IzVVBBVXhnTEk0PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiRXRvQmI2Um5ubTN1S1lnZjg2Y0RYZyIsInN1YiI6IjhhYjQ4OTU0LTgyZmQtNDcyNS1iMDRhLWQzNTFkM2RhYzcwZSIsImNvZ25pdG86Z3JvdXBzIjpbImFwLW5vcnRoZWFzdC0yX3FKMkpMU2dyTV9GYWNlYm9vayJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTJfcUoySkxTZ3JNIiwiY29nbml0bzp1c2VybmFtZSI6IkZhY2Vib29rXzIyOTM3Nzk0MjQwMzg0NzQiLCJub25jZSI6IllZSGZxUzlkSEVrcVAxbkhfTUhKUUhCN3dyZkhjM1pBZDQtblJJaTRGb0hlOWFPMzJ3V0l1cXVWNnlDVlJqNjdMdmVqMk13NEQ0V1RiTG5MeTd6QVVJcWp3c2VQT29GSVZmWnNXSE9jeHcyWDhNVmx5VUFvLVNoT0p2d1ZHY1Zja1pRMlBVa0VyaEZNUU1WMkdwOFd4czBBOS1yZGxyYmlsUHY4STJOOGVxUSIsImF1ZCI6IjR0amE3ZzFrMTAyYWhlc2dpNzB0NjNpY3EzIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiMjI5Mzc3OTQyNDAzODQ3NCIsInByb3ZpZGVyTmFtZSI6IkZhY2Vib29rIiwicHJvdmlkZXJUeXBlIjoiRmFjZWJvb2siLCJpc3N1ZXIiOm51bGwsInByaW1hcnkiOiJ0cnVlIiwiZGF0ZUNyZWF0ZWQiOiIxNTYyODI3MDg0NjM0In1dLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU3MjE1MzA0NywiZXhwIjoxNTcyMTU2NjQ3LCJpYXQiOjE1NzIxNTMwNDcsImVtYWlsIjoiYmh3MTk5NEBnbWFpbC5jb20ifQ.JVv78fZpAgVAFiRa3kmFTpysiURYl8gwaBEqsoMmqbezW7O1ujD6xlOCHo8ZK5jsTQBi4E5jMOh6NVpcRYtbHl0mMT9GDCZmnCWXhs6vepVXS5q4cNNtRLIbJLzhuMi_Seim_A-IUQ63x-jJBfUvWZbKi4KFoVBFl-a3N8lVesO-C8PmC91GqZ_woQcDnagtZULIRDyrTgtF4oEfBPNn7ATNrlHrXLK6dnOPxK9EJKFbPyeI9U8cw93ENuWUlQIZgkSqeYWDOPSxWH43hoQ0mwGQq016OzabCF_jAlk4uk98--7rh9VmjxV4bGoL3kixoIkKTO7sVvaCUHyrLUNqvg";
    let userId;

    let connect;
    let disconnect;

    before(async () => {
        dbHelper = new DBHelper.DbHelper();
        await dbHelper.createDB(config.test);
        await dbHelper.connect(config.test);
        dbHelper.init();
        await dbHelper.migrate();

        userDao = dbHelper.getUserDao();
        userId = tokenDecoder.decode(accessToken)[1].identities[0]["userId"];

        connect = sinon.stub(dbHelper,"connect");
        disconnect = sinon.stub(dbHelper,"disconnect");


        //mock connection
        let stub = sinon.stub(mockDbHelper,"DbHelper").returns(dbHelper);
        handler.__set__("DBHelper",mockDbHelper);

    });

    after(async () => {
        connect.restore();
        disconnect.restore();

        await dbHelper.disconnect();
    });

    beforeEach(async () => {
        //force migrate
        await dbHelper.migrate(true);
        user = await userDao.create({ userId: userId });

    });

    

    it("should except error null", async function () {
        //given
        const url = "google.com";
        const event = {
            "headers": { "Authorization": accessToken },
            "body": ""
        }
        //when
        const response = await handler.postMemos(event);

        //then
        const expectedResponse = { statusCode: 400 }
        expect(response).to.contain(expectedResponse);
    });
    it("should post memos", async function () {
        //given 
        const url = "google.com";
        const memoList = [{ content: "memo1", url: url ,positionLeft:"10px",positionTop:"10px"}, { content: "memo2", url: url ,positionLeft:"10px",positionTop:"10px"}, { memoId: 1, content: "modify", url: url ,positionLeft:"10px",positionTop:"10px"}];
        const event = {
            "headers": { "Authorization": accessToken },
            "body": JSON.stringify(memoList)
        }
        //when
        const response = await handler.postMemos(event);

        //then
        const expectedResponse = { statusCode: 200 }
        expect(response).to.contain(expectedResponse);
    });

    it("should get all user's memo",async function(){
        //given 
        const url1 = "google.com";
        const url2 = "naver.com";
        const memoList = [{ content: "memo1", url: url1 ,positionLeft:"10px",positionTop:"10px"}, { content: "memo2", url: url2 ,positionLeft:"10px",positionTop:"10px"}];
        let event = {
            "headers": { "Authorization": accessToken },
            "body": JSON.stringify(memoList)
        }
        await handler.postMemos(event);

        //when
        event = {
            "headers": { "Authorization": accessToken },
            "queryStringParameters": {}
        }
        const response = await handler.getMemos(event);

        //then
        const expectedResponse = { statusCode: 200 }
        expect(response).to.contain(expectedResponse);

        const expectedMemoListLength = 2;
        const responseMemoList = JSON.parse(response.body);
        expect(responseMemoList.length).to.equal(expectedMemoListLength);
        
    });
    it("should get site's memos", async function () {
        //given 
        const url1 = "google.com";
        const url2 = "naver.com";
        const requestUrl = "google.com";
        const memoList = [{ content: "memo1", url: url1 ,positionLeft:"10px",positionTop:"10px"}, { content: "memo2", url: url2 ,positionLeft:"10px",positionTop:"10px"}];
        let event = {
            "headers": { "Authorization": accessToken },
            "body": JSON.stringify(memoList)
        }
        await handler.postMemos(event);

        //when
        event = {
            "headers": { "Authorization": accessToken },
            "queryStringParameters": { requestUrl: requestUrl }
        }
        const response = await handler.getMemos(event);

        //then
        const expectedResponse = { statusCode: 200 }
        expect(response).to.contain(expectedResponse);

        const expectedMemoListLength = 1;
        const responseMemoList = JSON.parse(response.body);
        expect(responseMemoList.length).to.equal(expectedMemoListLength);
    });
    it("should delete memos", async function () {
        //given 
        const url = "google.com";
        const memoList = [{ content: "memo1", url: url ,positionLeft:"10px",positionTop:"10px"}];
        let event = {
            "headers": { "Authorization": accessToken },
            "body": JSON.stringify(memoList)
        }
        await handler.postMemos(event);

        //when
        event = {
            "headers": { "Authorization": accessToken },
            "queryStringParameters": {}
        }
        let response = await handler.getMemos(event);
        const memo = JSON.parse(response.body)[0];
        console.log(JSON.stringify(memo));
        

        event = {
            "headers": { "Authorization": accessToken },
            "pathParameters": {
                "memoId": memo.memoId
              }
        }
        response = await handler.deleteMemos(event);

        //then
        const expectedResponse = { statusCode: 200 }
        expect(response).to.contain(expectedResponse);

        event = {
            "headers": { "Authorization": accessToken },
            "queryStringParameters": {}
        }
        const remainedMemos = await handler.getMemos(event)
        const expectedMemoListLength = 0;
        const responseMemoList = JSON.parse(remainedMemos.body);
        expect(responseMemoList.length).to.equal(expectedMemoListLength);
    });
    it("should catch error when delete memo id is invalid ",async function(){
        //when
        const event = {
            "headers": { "Authorization": accessToken },
        }
        const response = await handler.deleteMemos(event);

        //then
        const expectedResponse = { statusCode: 400 }
        expect(response).to.contain(expectedResponse);


    });
});

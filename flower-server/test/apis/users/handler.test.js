import chai, { expect } from "chai"
import sinon from "sinon"
import "@babel/polyfill"

import config from "../../../config/config"

import * as DBHelper from "../../../models/dbHelper"

import rewire from "rewire"
const handler = rewire("../../../src/users/handler");
const mockDbHelper = rewire("../../../models/dbHelper");
describe("Memo Handler Test", function () {
    
    let dbHelper;
    const accessToken = "eyJraWQiOiJuWE1ncjRUdXQwMXc4c0lFUkkxRFJZUmQ4bDBrcEhlc2IzVVBBVXhnTEk0PSIsImFsZyI6IlJTMjU2In0.eyJhdF9oYXNoIjoiRXRvQmI2Um5ubTN1S1lnZjg2Y0RYZyIsInN1YiI6IjhhYjQ4OTU0LTgyZmQtNDcyNS1iMDRhLWQzNTFkM2RhYzcwZSIsImNvZ25pdG86Z3JvdXBzIjpbImFwLW5vcnRoZWFzdC0yX3FKMkpMU2dyTV9GYWNlYm9vayJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuYXAtbm9ydGhlYXN0LTIuYW1hem9uYXdzLmNvbVwvYXAtbm9ydGhlYXN0LTJfcUoySkxTZ3JNIiwiY29nbml0bzp1c2VybmFtZSI6IkZhY2Vib29rXzIyOTM3Nzk0MjQwMzg0NzQiLCJub25jZSI6IllZSGZxUzlkSEVrcVAxbkhfTUhKUUhCN3dyZkhjM1pBZDQtblJJaTRGb0hlOWFPMzJ3V0l1cXVWNnlDVlJqNjdMdmVqMk13NEQ0V1RiTG5MeTd6QVVJcWp3c2VQT29GSVZmWnNXSE9jeHcyWDhNVmx5VUFvLVNoT0p2d1ZHY1Zja1pRMlBVa0VyaEZNUU1WMkdwOFd4czBBOS1yZGxyYmlsUHY4STJOOGVxUSIsImF1ZCI6IjR0amE3ZzFrMTAyYWhlc2dpNzB0NjNpY3EzIiwiaWRlbnRpdGllcyI6W3sidXNlcklkIjoiMjI5Mzc3OTQyNDAzODQ3NCIsInByb3ZpZGVyTmFtZSI6IkZhY2Vib29rIiwicHJvdmlkZXJUeXBlIjoiRmFjZWJvb2siLCJpc3N1ZXIiOm51bGwsInByaW1hcnkiOiJ0cnVlIiwiZGF0ZUNyZWF0ZWQiOiIxNTYyODI3MDg0NjM0In1dLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU3MjE1MzA0NywiZXhwIjoxNTcyMTU2NjQ3LCJpYXQiOjE1NzIxNTMwNDcsImVtYWlsIjoiYmh3MTk5NEBnbWFpbC5jb20ifQ.JVv78fZpAgVAFiRa3kmFTpysiURYl8gwaBEqsoMmqbezW7O1ujD6xlOCHo8ZK5jsTQBi4E5jMOh6NVpcRYtbHl0mMT9GDCZmnCWXhs6vepVXS5q4cNNtRLIbJLzhuMi_Seim_A-IUQ63x-jJBfUvWZbKi4KFoVBFl-a3N8lVesO-C8PmC91GqZ_woQcDnagtZULIRDyrTgtF4oEfBPNn7ATNrlHrXLK6dnOPxK9EJKFbPyeI9U8cw93ENuWUlQIZgkSqeYWDOPSxWH43hoQ0mwGQq016OzabCF_jAlk4uk98--7rh9VmjxV4bGoL3kixoIkKTO7sVvaCUHyrLUNqvg";
    
    let connect;
    let disconnect;
    
    before(async () => {
        dbHelper = new DBHelper.DbHelper();
        await dbHelper.createDB(config.test);
        await dbHelper.connect(config.test);
        dbHelper.init();
        await dbHelper.migrate();
        
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
        
    });
    
    it("should create new user", async function () {
        //given
        
        const event = {
            "headers": { "Authorization": accessToken }
        }
        //when
        const response = await handler.postUser(event);
        
        //then
        const expectedResponse = { statusCode: 200 }
        expect(response).to.contain(expectedResponse);
    });
});

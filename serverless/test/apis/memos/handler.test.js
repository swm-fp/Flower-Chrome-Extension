import chai, { expect } from "chai"
import sinon from "sinon"
import "@babel/polyfill"

import config from "../../../config/config"
import UserModel from "../../../models/UserModel"

import rewire from "rewire"
import * as dbHelper from "../../../models/dbHelper"

const mockDbHelper = rewire("../../../models/dbHelper");
const get = rewire("../../../src/memos/get");
const post = rewire("../../../src/memos/post");
const handler = rewire("../../../src/memos/handler");

describe("Memo Handler Test", function () {

    let sequelize;
    let userDao;
    let user;

    before(async () => {
        await dbHelper.createDB(config.test);
        sequelize = await dbHelper.connect(config.test);
        await dbHelper.migrate();

        userDao = UserModel.init(sequelize);

        //mock connection
        sinon.stub(mockDbHelper,"connect").returns(sequelize);
        sinon.stub(mockDbHelper,"disconnect");

        get.__set__("dbHelper", mockDbHelper);
        post.__set__("dbHelper", mockDbHelper);
        handler.__set__("get", get);
        handler.__set__("post", post);

    });

    after(async () => {
        await sequelize.close();
    });

    beforeEach(async () => {
        await dbHelper.migrate(true);
        user = await userDao.create({ userId: "bhw" });
    });

    it("should post memos", async function () {
        //given 
        const url = "google.com";
        const memoList = [{ content: "memo1", url: url }, { content: "memo2", url: url }, { memoId: 1, content: "modify", url: url }];
        const event = {
            "headers": { "Authorization": user.userId },
            "body": JSON.stringify(memoList)
        }
        //when
        const response = await handler.postMemos(event);

        //then
        const expectedResponse = { statusCode: 200 }
        expect(response).to.contain(expectedResponse);
    });

    it("should get site's memos", async function () {
        //given 
        const url = "google.com";
        const memoList = [{ content: "memo1", url: url }, { content: "memo2", url: url }, { memoId: 1, content: "modify", url: url }];
        let event = {
            "headers": { "Authorization": user.userId },
            "body": JSON.stringify(memoList)
        }
        await handler.postMemos(event);

        //when
        event = {
            "headers": { "Authorization": user.userId },
            "queryStringParameters": { requestUrl: url }
        }
        const response = await handler.getMemos(event);

        //then
        const expectedResponse = { statusCode: 200 }
        expect(response).to.contain(expectedResponse);
    });
});

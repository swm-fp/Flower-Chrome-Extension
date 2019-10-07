import chai, { expect } from "chai"
import "@babel/polyfill"
import config from "../../config/config"
import UserModel from "../../models/UserModel"
import MemoModel from "../../models/MemoModel"
import UserMemoModel from "../../models/UserMemoModel"
import * as dbHelper from "../../models/dbHelper"

let sequelize;
let userDao;
let memoDao;
let userMemoDao;

describe("Sequelize Test", function () {

    before(async () => {
        await dbHelper.createDB(config.test);
        sequelize = await dbHelper.connect(config.test);
        await dbHelper.migrate();

        userDao = UserModel.init(sequelize);
        memoDao = MemoModel.init(sequelize);
        userMemoDao = UserMemoModel.init(sequelize);
    });

    after(async () => {
        await dbHelper.disconnect();
    });

    describe("Constraints Test", async () => {

        let user;
        let memo;
        let userMemo;
        
        it("insert Test", async () => {
            user = await userDao.create({ userId: "bhw" });
            memo = await memoDao.create({ content: "hello bhw", url: "https://www.naver.com" });
            userMemo = await userMemoDao.create({ userId: user.userId, memoId: memo.memoId });
        });

        it("cascade delete when delete user",async ()=>{
            //when
            let count = await userMemoDao.count();
            expect(count).to.equal(1);

            //then
            await userDao.destroy({where : { userId : user.userId } });
            count = await userMemoDao.count();
            expect(count).to.equal(0);
        });
    });
});

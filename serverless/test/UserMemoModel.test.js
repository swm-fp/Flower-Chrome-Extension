import chai, { expect } from "chai"
import "@babel/polyfill"
import config from "../config/config"
import { createDB, getSequelize } from "../models/dbHelper"
import UserModel from "../models/UserModel"
import MemoModel from "../models/MemoModel"
import UserMemoModel from "../models/UserMemoModel"

let sequelize;
let userDao;
let memoDao;
let userMemoDao;

describe("Sequelize Test", function () {

    before(async () => {
        await createDB(config.test);
        sequelize = getSequelize(config.test);
        await sequelize.authenticate();

        userDao = UserModel.init(sequelize);
        memoDao = MemoModel.init(sequelize);
        userMemoDao = UserMemoModel.init(sequelize);

        await sequelize.sync();
    });

    after(async () => {
        await sequelize.close();
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

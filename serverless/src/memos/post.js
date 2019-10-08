import * as dbHelper from "../../models/dbHelper"
import config from "../../config/config"

import UserModel from "../../models/UserModel"
import MemoModel from "../../models/MemoModel"
import UserMemoModel from "../../models/UserMemoModel"
import { Op } from "sequelize"

export async function memos(userId, memoList) {
    let sequelize = await dbHelper.connect(config.development);

    let userDao = UserModel.init(sequelize);
    let memoDao = MemoModel.init(sequelize);
    let userMemoDao = UserMemoModel.init(sequelize);


    let rows = await userDao.findAll({
        raw: true,
        where: {
            userId: userId,
            "$UserMemos.authority$": { [Op.lte]: 1 }
        },
        include: [{
            model: UserMemoModel,
            include: [{
                model: MemoModel
            }]
        }]
    });


    let memoIds = [];
    for (const row of rows) {
        memoIds.push(row["UserMemos.memoId"]);
    }

    for (let memo of memoList) {
        if (memo.memoId == undefined) {
            memo = await memoDao.create(memo);
            await userMemoDao.create({ userId: userId, memoId: memo.memoId });
        }
        else{
            if(memo.memoId in memoIds){
                await memoDao.upsert(memo);
            }
        }
    }
    await dbHelper.disconnect();


}
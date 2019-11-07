import MemoModel from "../../models/MemoModel"
import UserMemoModel from "../../models/UserMemoModel"

import { Op } from "sequelize"

export async function memos(dbHelper,userId, memoList) {

    let userDao = dbHelper.getUserDao();
    let memoDao = dbHelper.getMemoDao();
    let userMemoDao = dbHelper.getUserMemoDao();

    await userDao.upsert({ userId: userId });

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



    let ownMemoSet = new Set();
    for (const row of rows) {
        ownMemoSet.add(row["UserMemos.memoId"]);
    }

    for (let memo of memoList) {
        if (memo.memoId == undefined) {
            memo = await memoDao.create(memo);
            await userMemoDao.create({ userId: userId, memoId: memo.memoId });
        }
        else {
            
            if (ownMemoSet.has(parseInt(memo.memoId))) {

                await memoDao.upsert(memo);
            }
        }
    }

}
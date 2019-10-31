import { Op } from "sequelize"
import MemoModel from "../../models/MemoModel"
import UserMemoModel from "../../models/UserMemoModel"
import UserModel from "../../models/UserModel"

export async function memos(dbHelper,userId, url = undefined) {
    const userDao = dbHelper.getUserDao();
    const userMemoDao = dbHelper.getUserMemoDao();

    await userDao.upsert({ userId: userId });

    const where = {
        userId: userId,
        "$UserMemos.authority$": { [Op.lte]: 1 }
    };

    if(url != undefined){
        where["$UserMemos.Memo.url$"] = url
    }

    let rows = await userDao.findAll({
        raw: true,
        where: where,
        include: [{
            model: UserMemoModel,
            include: [{
                model: MemoModel
            }]
        }]
    });
    
    

    return rows;

}
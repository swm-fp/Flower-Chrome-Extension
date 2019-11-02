import Sequelize,{ Op } from "sequelize"
import MemoModel from "../../models/MemoModel"
import UserMemoModel from "../../models/UserMemoModel"
import UserModel from "../../models/UserModel"

export async function memos(dbHelper,userId, memoId) {
    const userDao = dbHelper.getUserDao();
    const userMemoDao = dbHelper.getUserMemoDao();
    const memoDao = dbHelper.getMemoDao();
    
    await userDao.upsert({ userId: userId });
    
    let row = await userMemoDao.findOne({
        raw: true,
        where: {
            userId: userId,
            memoId: memoId
        }
    });

    if(row != null){
        await memoDao.destroy({
            where: {
                memoId: memoId
            }
        });
    }
}
import Sequelize,{ Op } from "sequelize"
import MemoModel from "../../models/MemoModel"
import UserMemoModel from "../../models/UserMemoModel"
import UserModel from "../../models/UserModel"

import UserAPI from "../users/UserAPI"
export async function memos(dbHelper,userId, memoId) {
    const userDao = dbHelper.getUserDao();
    const userMemoDao = dbHelper.getUserMemoDao();
    const memoDao = dbHelper.getMemoDao();
    
    await UserAPI.createUser(dbHelper,userId);
    
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
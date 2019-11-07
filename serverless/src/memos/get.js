import Sequelize,{ Op } from "sequelize"
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
        //attributes: [['UserMemos.Memo.memoId','memoId'],['UserMemos.Memo.content','content'],['UserMemos.Memo.url', 'url']],
        //attributes: [['UserMemos->Memo.url', 'url']],
        raw: true,
        where: where,
        attributes:[[Sequelize.col('UserMemos->Memo.url'), 'url'],[Sequelize.col('UserMemos->Memo.content'), 'content'],[Sequelize.col('UserMemos->Memo.memoId'), 'memoId'],[Sequelize.col('UserMemos->Memo.positionLeft'), 'positionLeft'],[Sequelize.col('UserMemos->Memo.positionTop'), 'positionTop']],
        include: [{
            model: UserMemoModel,
            attributes: [],
            
            include: [{
                attributes: [],
                model: MemoModel
            }]
        }]
    });

    return rows;

}
import Sequelize,{ Op } from "sequelize"
import MemoModel from "../../models/MemoModel"
import Project from "../../models/ProjectModel"

export async function memos(dbHelper,userId, memoId) {
    const memoDao = dbHelper.getMemoDao();
    const projectUserDao = dbHelper.getProjectUserDao();
    const sequelize = dbHelper.getSequelize();
    
    const rows = await projectUserDao.findAll({
        raw: true,
        where: {
            userId: userId,
            "$Project->Memos.memoId$" : memoId,
            authority: { [Op.lte]: 1 }
        },
        include : [{
            model : Project,
            include: [{
                model: MemoModel,
            }]
        }],
    });
    

    if(rows.length != 0 ){
        await memoDao.destroy({
            where: {
                memoId: memoId
            }
        });
    }
}
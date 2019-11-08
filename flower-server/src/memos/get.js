import Sequelize,{ Op } from "sequelize"
import MemoModel from "../../models/MemoModel"
import Project from "../../models/ProjectModel"

export async function memos(dbHelper,userId, url = undefined) {
    const userDao = dbHelper.getUserDao();
    const projectUserDao = dbHelper.getProjectUserDao();

    const where = {
        userId: userId,
        authority: { [Op.lte]: 2 },
        "$Project->Memos.memoId$" : {[Op.ne] : null}
    }
    if(url != undefined){
        where["$Project.Memos.url$"] = url
    }

    let rows = await projectUserDao.findAll({
        raw: true,
        where: where,
        attributes:["authority","projectId",[Sequelize.col('Project->Memos.url'), 'url'],[Sequelize.col('Project->Memos.content'), 'content'],[Sequelize.col('Project->Memos.memoId'), 'memoId'],[Sequelize.col('Project->Memos.positionLeft'), 'positionLeft'],[Sequelize.col('Project->Memos.positionTop'), 'positionTop']],
        include: [{
            model: Project,
            attributes: [],
            include: [{
                attributes: [],
                model: MemoModel
            }]
        }]
    });
    return rows;
}
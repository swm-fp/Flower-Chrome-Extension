import MemoModel from "../../models/MemoModel"
import Project from "../../models/ProjectModel"
import { Op } from "sequelize"
import UserAPI from "../users/UserAPI"

export async function memos(dbHelper,userId, memoList) {
    
    let sequelize = dbHelper.getSequelize();
    let userDao = dbHelper.getUserDao();
    let memoDao = dbHelper.getMemoDao();
    let projectUserDao = dbHelper.getProjectUserDao();
    
    await UserAPI.createUser(dbHelper,userId);

    const rows = await projectUserDao.findAll({
        raw: true,
        attributes:["projectId",[sequelize.col('Project->Memos.memoId'), 'memoId']],
        where: {
            userId: userId,
            "$Project->Memos.memoId$" : {[Op.ne] : null },
            authority: { [Op.lte]: 1 }
        },
        include : [{
            model : Project,
            attributes:[],            
            include: [{
                model: MemoModel,
                attributes:[],
            }]
        }],
    });
    
    let ownMemoDict = {}
    for (const row of rows) {
        ownMemoDict[row["memoId"]] = row["projectId"];
    }
    const projectUser = await projectUserDao.findOne({
        raw : true,
        where :{
            userId : userId,
            authority : 0
        }
    })
    const privateProjectId = projectUser.projectId;
    

    const verifiedMemoList = []
    const newMemoList = []
    for (let memo of memoList) {
        if (memo.memoId == undefined) {
            memo.projectId = privateProjectId;
            newMemoList.push(memo);
        }
        else {
            if(ownMemoDict[ memo.memoId ] != undefined ){
                memo.projectId = ownMemoDict[memo.memoId];
                verifiedMemoList.push(memo);
            }
        }
    }

    let transaction;
    try{
        transaction = await sequelize.transaction();
        
        for(let memo of newMemoList){
            memo = await memoDao.create(memo);
        }

        for(let memo of verifiedMemoList){
            await memoDao.upsert(memo);
        }

        transaction.commit();
    }
    catch(e){
        if(transaction) transaction.rollback();
        throw e;
    }
}
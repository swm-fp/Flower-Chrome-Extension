import Sequelize,{ Op } from "sequelize"
import MemoModel from "../../models/MemoModel"
import Project from "../../models/ProjectModel"

const MemoAPI = {
    readMemoList : async (dbHelper,userId, url = undefined)=>{
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
    },
    
    saveMemoList : async (dbHelper,userId, memoList) => {
        
        let sequelize = dbHelper.getSequelize();
        let userDao = dbHelper.getUserDao();
        let memoDao = dbHelper.getMemoDao();
        let projectUserDao = dbHelper.getProjectUserDao();
        
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
    },
    
    deleteMemo : async (dbHelper,userId, memoId) => {
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
    
}

export default MemoAPI;


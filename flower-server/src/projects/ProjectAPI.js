
import ProjectModel from "../../models/ProjectModel"
import MemoModel from "../../models/MemoModel"
import ProjectUserModel from "../../models/ProjectUserModel";
import Sequelize,{ Op } from "sequelize"
import uniqid from "uniqid"
const ProjectAPI = {
    createProject: async (dbHelper, userId, projectName) => {
        const projectDao = dbHelper.getProjectDao();
        const projectUserDao = dbHelper.getProjectUserDao();
        const shareKeyDao = dbHelper.getShareKeyDao();
        
        const project = await projectDao.create({ name: projectName });
        const projectUser = await projectUserDao.create({ userId: userId, projectId: project.projectId });
        
        return project;
    },
    addMemoToProject: async (dbHelper, userId, projectId, memoIdList) => {
        const userDao = dbHelper.getUserDao();
        const projectDao = dbHelper.getProjectDao();
        const projectUserDao = dbHelper.getProjectUserDao();
        const memoDao = dbHelper.getMemoDao();
        
        //check project is user's
        const userProject = await projectUserDao.findOne({
            raw: true,
            where: {
                userId: userId,
                projectId: projectId
            }
        });
        if (userProject == null) {
            throw "project is not user's";
        }
        
        
        
        //check memo is user's and private memo
        const projectUser = await projectUserDao.findOne({
            raw : true,
            where : {
                userId:userId,
                "$Project.name$" : "private project"
            },
            include : [{
                model : ProjectModel,
            }]
        });
        
        const privateProjectId = projectUser["projectId"];
        
        const rows = await projectDao.findAll({
            raw: true,
            where: {
                projectId : privateProjectId
            },
            include: [{
                model: MemoModel,
            }]
        });
        
        const privateMemoIdSet = new Set();
        for(let row of rows){
            privateMemoIdSet.add(row["Memos.memoId"]);
        }
        
        const verifiedMemoIdList = [];
        for(let id of memoIdList){
            if(privateMemoIdSet.has(parseInt(id))){
                verifiedMemoIdList.push(id);
            }
        }
        
        const sequelize = dbHelper.getSequelize();
        let transaction;
        try {
            transaction = await sequelize.transaction();
            for(let id of verifiedMemoIdList){
                await memoDao.update({
                    projectId : projectId
                },
                {
                    where: { memoId :  id} 
                },{transaction});
            }
            
            // commit
            await transaction.commit();
            return true;
            
        } catch (err) {
            // Rollback transaction only if the transaction object is defined
            if (transaction) await transaction.rollback();
            return err;
        }
        
    },
    readProject : async (dbHelper,userId,projectId = undefined)=>{

        const projectDao = dbHelper.getProjectDao();
        const where = {
            "$ProjectUsers.userId$" : userId
        }
        if(projectId != undefined){
            where["projectId"] = projectId;
        }

        const rows = await projectDao.findAll({
            attributes : ["projectId","name"],
            where : where,
            include : [{
                model : MemoModel,
                attributes : ["memoId","content"]
            },
            {
                model : ProjectUserModel,
                attributes : []
            }]
        });

        const result = [];
        for(let row of rows){
            if(row.Memos.length != 0){
                result.push(row);
            }
        }
        return result;
    },
    createShareKey : async (dbHelper,userId,projectId) =>{
        //project is user's
        const projectUserDao = dbHelper.getProjectUserDao();
        const shareKeyDao = dbHelper.getShareKeyDao();
        const row = await projectUserDao.findOne({
            raw : true,
            where : {
                projectId : projectId,
                userId : userId,
                "$Project.name$" : {
                    [Op.ne]: "private project"
                }
            },
            include : [{
                model : ProjectModel
            }],
        });
        if(row == null){
            throw "createShareKey request is not valid";
        }

        const keyRow = await shareKeyDao.create({key : uniqid(),projectId : projectId});
        return keyRow;
    },
    addProjectToUser: async (dbHelper,userId,key)=>{
        const shareKeyDao = dbHelper.getShareKeyDao();
        const projectUserDao = dbHelper.getProjectUserDao();

        const row = await shareKeyDao.findOne({
            raw : true,
            where : {
                key : key
            }
        });
        const shareProjectId = row.projectId;

        try{
            await projectUserDao.create({projectId : shareProjectId , userId : userId});            
            return true;
        }
        catch(e){
            return false;
        }
    }


};
export default ProjectAPI;

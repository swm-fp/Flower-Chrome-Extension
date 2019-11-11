
import ProjectModel from "../../models/ProjectModel"
import MemoModel from "../../models/MemoModel"
import ProjectUser from "../../models/ProjectUserModel";
const ProjectAPI = {
    createProject: async (dbHelper, userId, projectName) => {
        const projectDao = dbHelper.getProjectDao();
        const projectUserDao = dbHelper.getProjectUserDao();
        
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
        const projectUser = await ProjectUser.findOne({
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
            if(privateMemoIdSet.has(id)){
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
        
    }
};
export default ProjectAPI;

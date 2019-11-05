const UserAPI = {
    createUser: async (dbHelper, userId) => {
        let transaction;
        try{
            const userDao = dbHelper.getUserDao();
            const projectDao = dbHelper.getProjectDao();
            const projectUserDao = dbHelper.getProjectUserDao();
            
            const sequelize = dbHelper.getSequelize();
            
            //transaction
            transaction = await sequelize.transaction();
            
            const user = await userDao.create({userId : userId},{transaction});
            const project = await projectDao.create({name : "private project"},{transaction});
            const projectUser = await projectUserDao.create({userId : user.userId,projectId : project.projectId},{transaction});
            
            await transaction.commit();
            
            return user;
        }catch (err) {
            // Rollback transaction only if the transaction object is defined
            if (transaction) await transaction.rollback();
            throw err;
        }
    }
}
export default UserAPI;
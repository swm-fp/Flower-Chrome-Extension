const UserAPI = {
    createUser: async (dbHelper, userId) => {
        const userDao = dbHelper.getUserDao();
        const projectDao = dbHelper.getProjectDao();
        const projectUserDao = dbHelper.getProjectUserDao();

        const selectedUesr = await userDao.findOne({
            raw : true,
            where : {
                userId : userId
            }
        });
        if(selectedUesr != null){
            return false;
        }

        const sequelize = dbHelper.getSequelize();        

        let transaction;
        try{
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
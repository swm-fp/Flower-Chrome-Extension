import Sequelize from "sequelize"
import User from "./UserModel"
import Project from "./ProjectModel"

class ProjectUser extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            projectId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                references: {
                    model: Project,
                    key: 'projectId'
                }
            },
            userId: {
                type: Sequelize.STRING,
                primaryKey: true,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                references: {
                    model: User,
                    key: 'userId'
                }
            },
            authority : {
                type: Sequelize.INTEGER,
                defaultValue : 0
            }
        }, {
            sequelize,
            modelName: 'ProjectUser',
            charset: 'utf8',
            collate: 'utf8_unicode_ci'
        });
    }
}
export default ProjectUser;

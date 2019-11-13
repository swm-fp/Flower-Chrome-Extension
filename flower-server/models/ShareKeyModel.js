import Sequelize from "sequelize"
import Project from "./ProjectModel"
class ShareKey extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            key: { type: Sequelize.STRING, primaryKey: true },
            projectId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
                references: {
                    model: Project,
                    key: 'projectId'
                }
            },

        }, {
            sequelize,
            modelName: 'ShareKey',
            charset: 'utf8',
            collate: 'utf8_unicode_ci'
        });
    }
}
export default ShareKey;

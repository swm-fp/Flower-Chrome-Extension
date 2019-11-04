import Sequelize from "sequelize"
class Project extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            projectId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            name: { type: Sequelize.TEXT,allowNull : false }
        }, {
            sequelize,
            modelName: 'Project',
            charset: 'utf8',
            collate: 'utf8_unicode_ci'
        });
    }
}
export default Project;

import Sequelize from "sequelize"
class Memo extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            memoId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            url: { type: Sequelize.STRING, allowNull: false },
            content: { type: Sequelize.TEXT },
        }, {
            sequelize,
            modelName: 'Memo'
        });
    }
}
export default Memo;

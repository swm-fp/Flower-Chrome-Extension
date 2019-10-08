import Sequelize from "sequelize"
import UserMemoModel from "./UserMemoModel"
class Memo extends Sequelize.Model {

    static model = undefined;

    static init(sequelize) {
        if (this.model == undefined) {
            this.model = super.init({
                memoId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
                url: { type: Sequelize.STRING, allowNull: false },
                content: { type: Sequelize.TEXT },
            }, {
                sequelize,
                modelName: 'Memo'
            });
        }
        return this.model;
    }
}
export default Memo;

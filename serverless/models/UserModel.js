import Sequelize from "sequelize"
import UserMemoModel from "./UserMemoModel"
class User extends Sequelize.Model {
  static model = undefined;
  static init(sequelize) {
    if (this.model == undefined) {

      this.model = super.init({
        userId: { type: Sequelize.STRING, primaryKey: true },
      }, {
        sequelize,
        modelName: 'User'
      });
    }
    return this.model;
  }
}
export default User;

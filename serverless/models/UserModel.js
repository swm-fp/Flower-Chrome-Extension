import Sequelize from "sequelize"
import UserMemoModel from "./UserMemoModel"
class User extends Sequelize.Model {
  static init(sequelize) {

    return super.init({
      userId: { type: Sequelize.STRING, primaryKey: true },
    }, {
      sequelize,
      modelName: 'User'
    });
  }
}
export default User;

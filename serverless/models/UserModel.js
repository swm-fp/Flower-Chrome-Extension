import Sequelize from "sequelize"
import UserMemoModel from "./UserMemoModel"
class User extends Sequelize.Model {
  static init(sequelize) {

    return super.init({
      userId: { type: Sequelize.STRING, primaryKey: true },
    }, {
      sequelize,
      modelName: 'User',
      charset: 'utf8',
      collate: 'utf8_unicode_ci'
    });
  }
}
export default User;

import Sequelize from "sequelize"
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

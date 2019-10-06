import Sequelize from "sequelize"
import User from "./UserModel"
import Memo from "./MemoModel"

class UserMemo extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            userId: {
                type: Sequelize.STRING,
                primaryKey: true,
                onDelete: 'CASCADE',
                references: {
                    model: User,
                    key: 'userId'
                }
            },
            memoId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                onDelete: 'CASCADE',
                references: {
                    model: Memo,
                    key: 'memoId'
                }
            },
        }, {
            sequelize,
            modelName: 'UserMemo'
        });
    }
}
export default UserMemo;

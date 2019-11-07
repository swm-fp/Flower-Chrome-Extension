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
            authority : {
                type: Sequelize.INTEGER,
                defaultValue : 0
                
            }
        }, {
            sequelize,
            modelName: 'UserMemo',
            charset: 'utf8',
            collate: 'utf8_unicode_ci'
        });
    }
}
export default UserMemo;

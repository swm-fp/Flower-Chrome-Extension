import Sequelize from "sequelize"
import User from "./UserModel"
import Memo from "./MemoModel"

class UserMemo extends Sequelize.Model {
    static model = undefined;
    static init(sequelize) {
        if (this.model == undefined) {

            this.model = super.init({
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
                modelName: 'UserMemo'
            });
        }
        return this.model;
    }
}
export default UserMemo;

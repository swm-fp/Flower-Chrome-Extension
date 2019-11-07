import Sequelize from "sequelize"
class Memo extends Sequelize.Model {
    
    
    static init(sequelize) {
        return super.init({
            memoId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
            url: { type: Sequelize.STRING, allowNull: false },
            content: { type: Sequelize.TEXT },
            positionLeft : {type: Sequelize.STRING,allowNull :false},
            positionTop : {type: Sequelize.STRING,allowNull:false},
        }, {
            sequelize,
            modelName: 'Memo',
            charset: 'utf8',
            collate: 'utf8_unicode_ci'
        });
    }
}
export default Memo;

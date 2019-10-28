import * as dbHelper from "../../models/dbHelper"
import config from "../../config/config"

import UserModel from "../../models/UserModel"
import MemoModel from "../../models/MemoModel"
import UserMemoModel from "../../models/UserMemoModel"
//import { Op } from "sequelize"

export async function memos(userId, url) {
    const sequelize = await dbHelper.connect(config.development);

    const userDao = UserModel.init(sequelize);
    const memoDao = MemoModel.init(sequelize);
    const userMemoDao = UserMemoModel.init(sequelize);

    await userDao.upsert({ userId: userId });

    const rows = await userMemoDao.findAll({
        raw: true,
        where: {
            userId: userId
        },
        include: [{
            model: MemoModel,
        }]
    });

    await dbHelper.disconnect();
    return rows;

}
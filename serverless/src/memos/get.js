//import { Op } from "sequelize"
import MemoModel from "../../models/MemoModel"

export async function memos(dbHelper,userId, url) {
    const userDao = dbHelper.getUserDao();
    const userMemoDao = dbHelper.getUserMemoDao();

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

    return rows;

}
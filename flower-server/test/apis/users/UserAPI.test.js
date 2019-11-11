import chai, { expect } from "chai"
import "@babel/polyfill"
import config from "../../../config/config"
import * as DBHelper from "../../../models/dbHelper"

import UserAPI from "../../../src/users/UserAPI"

let dbHelper;
let userDao;
let projectDao;
let projectUserDao;


describe("UserAPI Test", function () {
    before(async () => {
        dbHelper = new DBHelper.DbHelper();
        await dbHelper.createDB(config.test);
        await dbHelper.connect(config.test);
        dbHelper.init();
        await dbHelper.migrate();

        userDao = dbHelper.getUserDao();
        projectDao = dbHelper.getProjectDao();
        projectUserDao = dbHelper.getProjectUserDao();
    });

    after(async () => {
        dbHelper.disconnect();
    });

    beforeEach(async () => {
        await dbHelper.migrate(true);
    });

    it("should create new user with private project", async () => {

        //given
        //not registerd user
        const userId = "bhw";

        //when
        await UserAPI.createUser(dbHelper, userId);

        //then
        const selectedUser = await userDao.findOne({
            raw: true,
            where: {
                userId: userId
            }
        });

        const selectedProject = await projectDao.findOne({
            raw: true,
            where: {
                name: "private project"
            }
        });
        const selectedProjectUser = await projectUserDao.findOne({
            raw: true,
            where: {
                userId : selectedUser.userId,
                projectId : selectedProject.projectId
            }
        });

        expect(selectedUser.userId).to.equal(userId);
        expect(selectedProject.name).to.equal("private project");
        expect(selectedProjectUser.authority).to.equal(0);

    });

    it("should pass when user already sign up", async () => {

        //given
        //not registerd user
        const userId = "bhw";
        await UserAPI.createUser(dbHelper, userId);
        //when

        await UserAPI.createUser(dbHelper,userId);

        //then
        const selectedUser = await userDao.findOne({
            raw: true,
            where: {
                userId: userId
            }
        });

        const selectedProject = await projectDao.findOne({
            raw: true,
            where: {
                name: "private project"
            }
        });
        const selectedProjectUser = await projectUserDao.findOne({
            raw: true,
            where: {
                userId : selectedUser.userId,
                projectId : selectedProject.projectId
            }
        });

        expect(selectedUser.userId).to.equal(userId);
        expect(selectedProject.name).to.equal("private project");
        expect(selectedProjectUser.authority).to.equal(0);

    });



});

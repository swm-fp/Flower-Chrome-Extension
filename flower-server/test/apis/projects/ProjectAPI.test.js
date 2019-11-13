import chai, { expect } from "chai"
import "@babel/polyfill"
import config from "../../../config/config"
import * as DBHelper from "../../../models/dbHelper"

import UserAPI from "../../../src/users/UserAPI"
import ProjectAPI from "../../../src/projects/ProjectAPI"
import MemoAPI from "../../../src/memos/MemoAPI"


let dbHelper;
let userDao;
let projectDao;
let projectUserDao;
let memoDao;

let user;
let userId;

describe("ProjectAPI Test", function () {
    before(async () => {
        dbHelper = new DBHelper.DbHelper();
        await dbHelper.createDB(config.test);
        await dbHelper.connect(config.test);
        dbHelper.init();
        await dbHelper.migrate();

        userDao = dbHelper.getUserDao();

        projectDao = dbHelper.getProjectDao();
        projectUserDao = dbHelper.getProjectUserDao();
        memoDao = dbHelper.getMemoDao();

        userId = "bhw";
    });

    after(async () => {
        dbHelper.disconnect();
    });

    beforeEach(async () => {
        await dbHelper.migrate(true);
        user = await UserAPI.createUser(dbHelper,userId);
    });

    it("should create new project", async () => {
        //given
        const projectName = "testProject";

        //when
        const project = await ProjectAPI.createProject(dbHelper,user.userId,projectName);

        //then
        const selectedProject = await projectDao.findOne({
            raw: true,
            where: {
                name: projectName
            }
        });
        const selectedProjectUser = await projectUserDao.findOne({
            raw: true,
            where: {
                userId : user.userId,
                projectId : selectedProject.projectId
            }
        });
        expect(selectedProject.name).to.equal(projectName);
        expect(selectedProjectUser.projectId).to.equal(selectedProject.projectId);
        expect(selectedProjectUser.userId).to.equal(user.userId);
    });

    it("should add memo to project", async () => {
        //given
        const projectName = "testProject";
        const project = await ProjectAPI.createProject(dbHelper,user.userId,projectName);
        //when

        const memoList = [{ content: "memo1", url: "google.com" ,positionLeft : "10px", positionTop : "10px"}, { content: "memo2", url: "google.com" ,positionLeft : "10px", positionTop : "10px"}];
        await ProjectAPI.addMemoToProject(dbHelper,user.userId,project.projectId,memoList);

        //then
        const selectedProject = await projectDao.findOne({
            raw: true,
            where: {
                name: projectName
            }
        });
        const selectedMemoList = await memoDao.findAll({
            raw : true
        });
        for(let memo of selectedMemoList){
            expect(selectedMemoList.projectId).to.equal(selectedProject.projectId);
        }
    });

    it("should read memo group by project",async function(){
        //given 
        
        const url = "google.com";
        let memoList = [{ content: "this is memo", url: url ,positionLeft:"10px",positionTop:"10px"}];
        await MemoAPI.saveMemoList(dbHelper,user.userId, memoList);
        
        //when
        const allProjectList = await ProjectAPI.readProject(dbHelper,user.userId);
        const privateProject = allProjectList[0];
        
        //then
        expect(privateProject.name).to.equal("private project");
        expect(privateProject.Memos.length).to.equal(1);
    });
});

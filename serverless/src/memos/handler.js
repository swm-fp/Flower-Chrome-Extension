import * as get from "./get"
import * as post from "./post"
import tokenDecoder from "../utils/tokenDecoder"
import * as DBHelper from "../../models/dbHelper"
import config from "../../config/config"

export async function postMemos(event) {
  let dbHelper = new DBHelper.DbHelper();
  await dbHelper.connect(config.development);
  dbHelper.init();
  await dbHelper.migrate();

  let memoList;
  try{
    memoList = JSON.parse(event.body);
  }
  catch(e){
    return {
      statusCode: 400,
      body: "request body is not valid :" +e.stack
    };
  }
  
  
  const accessToken = event.headers.Authorization;
  const userId = tokenDecoder.decode(accessToken)[1].identities[0]["userId"];

  try {
    await post.memos(dbHelper, userId, memoList);
    await dbHelper.disconnect();
    return {
      statusCode: 200,
      body: "success"
    };
  }
  catch (e) {
    await dbHelper.disconnect();
    console.log(e);
    return {
      statusCode: 401,
      body: "postMemos Error : " + e.stack

    };
  }

}

export async function getMemos(event) {
  const dbHelper = new DBHelper.DbHelper();
  await dbHelper.connect(config.development);
  dbHelper.init();
  await dbHelper.migrate();

  const url = event.queryStringParameters.requestUrl;
  const accessToken = event.headers.Authorization;
  const userId = tokenDecoder.decode(accessToken)[1].identities[0]["userId"];
  try {
    const result = await get.memos(dbHelper,userId, url);
    await dbHelper.disconnect();
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  }
  catch (e) {
    await dbHelper.disconnect();
    console.log(e);
    return {
      statusCode: 401,
      body: "getMemos Error : " + e.stack
    };
  }
}

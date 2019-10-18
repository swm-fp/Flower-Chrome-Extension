import * as get from "./get"
import * as post from "./post"

export async function postMemos(event) {
  const userId = event.headers.Authorization;
  const memoList = JSON.parse(event.body);
  console.log(userId);
  console.log(JSON.stringify(memoList));
  try {
    await post.memos(userId, memoList);
    return {
      statusCode: 200
    };
  }
  catch (e) {
    return {
      statusCode: 401,
      body: "postMemos Error"
    };
  }

}

export async function getMemos(event) {

  const userId = event.headers.Authorization;
  const url = event.queryStringParameters.requestUrl;
  console.log(userId);
  console.log(url);
  try {
    const result = await get.memos(userId, url);
    return {
      statusCode: 200,
      body : JSON.stringify(result)
    };
  }
  catch (e) {
    return {
      statusCode: 401,
      body: "getMemos Error"
    };
  }
}

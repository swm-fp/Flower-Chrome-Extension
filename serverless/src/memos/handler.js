import * as get from "./get"
import * as post from "./post"
import tokenDecoder from "../utils/tokenDecoder"
export async function postMemos(event) {
  const memoList = JSON.parse(event.body);
  const accessToken = event.headers.Authorization;
  const userId = tokenDecoder.decode(accessToken)[1].identities[0]["userId"];

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

  const url = event.queryStringParameters.requestUrl;
  const accessToken = event.headers.Authorization;
  const userId = tokenDecoder.decode(accessToken)[1].identities[0]["userId"];
  try {
    const result = await get.memos(userId, url);
    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  }
  catch (e) {
    return {
      statusCode: 401,
      body: "getMemos Error"
    };
  }
}

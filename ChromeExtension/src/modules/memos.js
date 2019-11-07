import FlowerAPI from "../apis/FlowerAPI";
import {
  reducerUtils,
  createPromiseThunk,
  handleAsyncActions
} from "../lib/asyncUtils";

const GET_MEMOS = "GET_MEMOS";
const GET_MEMOS_SUCCESS = "GET_MEMOS_SUCCESS";
const GET_MEMOS_ERROR = "GET_MEMOS_ERROR";

export const getMemos = createPromiseThunk(GET_MEMOS, FlowerAPI.getMemos);

const initailState = {
  memos: reducerUtils.initial()
};

const getMemosReducer = handleAsyncActions(GET_MEMOS, "memos");

export default function memos(state = initailState, action) {
  switch (action.type) {
    case GET_MEMOS:
    case GET_MEMOS_SUCCESS:
    case GET_MEMOS_ERROR:
      return getMemosReducer(state, action);
    default:
      return state;
  }
}

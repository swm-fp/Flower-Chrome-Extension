const SHARE_ON = "share/SHARE_ON";
const SHARE_OFF = "share/SHARE_OFF";

export const shareOn = () => ({
  type: SHARE_ON
});
export const shareOff = () => ({
  type: SHARE_OFF
});

const initialState = {
  check: false
};

export default function share(state = initialState, action) {
  switch (action.type) {
    case SHARE_ON:
      return {
        ...state,
        check: true
      };
    case SHARE_OFF:
      return {
        ...state,
        check: false
      };
    default:
      return state;
  }
}

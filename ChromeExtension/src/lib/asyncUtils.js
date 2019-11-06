export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return param => async dispatch => {
    dispatch({ type, param });
    try {
      const payload = await promiseCreator(param);
      dispatch({
        type: SUCCESS,
        payload
      });
    } catch (e) {
      dispatch({
        type: ERROR,
        payload: e,
        error: true
      });
    }
  };
};

export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading()
        };
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload)
        };
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload)
        };
      default:
        return state;
    }
  };
};

export const reducerUtils = {
  initial: (data = null) => ({
    data,
    loading: false,
    error: null
  }),

  loading: (prevState = null) => ({
    data: prevState,
    loading: true,
    error: null
  }),

  success: data => ({
    data,
    loading: false,
    error: null
  }),

  error: error => ({
    data: null,
    loading: false,
    error
  })
};

import { AUTH } from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      console.log(action.data);
      return state;
    default:
      return state;
  }
};

export default authReducer;

//timespan is 1:05:40
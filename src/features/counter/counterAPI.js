//(thunk to create async logic code its implement by default to configure store)
import Axios from "axios";
import { userLoaded } from "./counterSlice";

// the outside "thunk creator" function
const fetchUserById = (userId) => {
  // the inside thunk function
  return async (dispatch, getState) => {
    try {
      // make an async call in the thunk
      const user = await Axios(`https://randomuser.me/api/?id=${userId}`);
      // dispatch an action when we get the response back
      dispatch(userLoaded(user.data.results[0].name.first));
    } catch (err) {
      console.log(err);
    }
  };
};

export default fetchUserById;
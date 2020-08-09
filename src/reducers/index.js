import { combineReducers } from "redux";
import searchReducer from "./searchReducer";
import userReducer from "./userReducer";

// Combine all the reducers and pass as a root reducer
export default combineReducers({
  searchState: searchReducer,
  userState: userReducer,
});

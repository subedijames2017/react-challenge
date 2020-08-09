import { combineReducers } from "redux";
import repositoryReducer from "./repositoryReducer";

// Combine all the reducers and pass as a root reducer
export default combineReducers({
  repositories: repositoryReducer,
});

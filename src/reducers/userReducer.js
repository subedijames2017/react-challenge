import { FETCH_USER, USER_LOADING } from "../actions/types";

const initialState = {
  user: null,
  loading: false,
  readme: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload.hasOwnProperty("user")
          ? action.payload.user
          : state.user,
        loading: action.payload.hasOwnProperty("loading")
          ? action.payload.loading
          : state.loading,
        readme: action.payload.hasOwnProperty("readme")
          ? action.payload.readme
          : state.readme,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
}

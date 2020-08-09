import { FETCH_USER, LOADING } from "../actions/types";

const initialState = {
  user: null,
  loading: false,
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
      };
    case LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
}

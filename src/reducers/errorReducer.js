import { GET_ERROR } from "../actions/types";

const initialState = {
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ERROR:
      return {
        ...state,
        error: action.payload.message,
      };
    default:
      return state;
  }
}

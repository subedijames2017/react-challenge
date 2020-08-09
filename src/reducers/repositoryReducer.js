import { FETCH_REPOSITORIES, FETCH_USER } from "../actions/types";

const initialState = {
  repositories: [],
  user: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    // case FETCH_REPOSITORIES:
    default:
      return state;
  }
}

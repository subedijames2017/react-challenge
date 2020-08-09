import { getRepositories } from "../services/index";
import {
  FETCH_REPOSITORIES,
  LOAD_REPOSITORIES,
  FETCH_USER,
} from "../actions/types";

export const reposetoriesList = (searchQuery, sort, order, page) => (
  dispatch
) => {
  getRepositories(searchQuery, sort, order, page)
    .then((res) => {
      dispatch({
        type: FETCH_REPOSITORIES,
        payload: res.data.items,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_REPOSITORIES,
        payload: {},
      });
    });
};

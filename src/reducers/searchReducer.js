import { FETCH_REPOSITORIES, FETCH_USER, LOADING } from "../actions/types";

const initialState = {
  searchString: "",
  list: [],
  loading: false,
  count: 0,
  sort: "",
  order: "desc",
  page: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_REPOSITORIES:
      return {
        ...state,
        searchString: action.payload.hasOwnProperty("searchString")
          ? action.payload.searchString
          : state.searchString,
        list: action.payload.hasOwnProperty("list")
          ? action.payload.list
          : state.list,
        loading: action.payload.hasOwnProperty("loading")
          ? action.payload.loading
          : state.loading,
        count: action.payload.hasOwnProperty("count")
          ? action.payload.count
          : state.count,
        sort: action.payload.hasOwnProperty("sort")
          ? action.payload.sort
          : state.sort,
        order: action.payload.hasOwnProperty("order")
          ? action.payload.order
          : state.order,
        page: action.payload.hasOwnProperty("page")
          ? action.payload.page
          : state.page,
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

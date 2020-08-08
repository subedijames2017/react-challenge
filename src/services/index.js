import axios from "axios";
import Config from "../constants/config";

export const getRepositories = (searchQuery, sort, order, page) => {
  console.log("getRepositories -> order", order);
  console.log("getRepositories -> sort", sort);
  console.log("getRepositories -> searchQuery", searchQuery);
  let url = `${Config.REPOSIRORY_URL}?q=${searchQuery}&sort=${sort}&order=${order}&per_page=${Config.PAGINATION_LIMIT}&page=${page}`;
  return axios.get(url);
};

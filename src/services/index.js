import axios from "axios";
import Config from "../constants/config";
// Get repositories
export const getRepositories = (searchQuery, sort, order, page) => {
  let url = `${Config.REPOSIRORY_URL}?q=${searchQuery}&sort=${sort}&order=${order}&per_page=${Config.PAGINATION_LIMIT}&page=${page}`;
  return axios.get(url);
};
// Get user
export const getUser = (login) => {
  let url = `${Config.USER_URL}/${login}`;
  return axios.get(url);
};
// Get readme content
export const getReadme = (login, repository) => {
  let url = `${Config.README_URL}/${login}/${repository}/readme`;
  return axios.get(url);
};

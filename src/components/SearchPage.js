import React from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { ReactComponent as GithubLogo } from "../github.svg";
import Repositories from "./Repositories";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRepositories } from "../services/index";
import Config from "../constants/config";
import { useSelector, useDispatch } from "react-redux";

function SearchPage() {
  // Search data from searchState reducer store
  const searchString = useSelector((state) => state.searchState.searchString);
  const repositories = useSelector((state) => state.searchState.list);
  const loading = useSelector((state) => state.searchState.loading);
  const count = useSelector((state) => state.searchState.count);
  const sort = useSelector((state) => state.searchState.sort);
  const order = useSelector((state) => state.searchState.order);
  const page = useSelector((state) => state.searchState.page);
  const error = useSelector((state) => state.errorState.error);
  const dispatch = useDispatch();

  const handelSearchFieldChange = (event) => {
    let newChange = {
      searchString: event.target.value,
    };
    dispatch({ type: "FETCH_REPOSITORIES", payload: newChange });
  };
  const handleSortChange = (event) => {
    if (event.target.value) {
      let newChange = {
        sort: event.target.value,
        list: [], // Empty repositories and repository count on sort change
        count: 0,
      };
      dispatch({ type: "FETCH_REPOSITORIES", payload: newChange });
      dispatch({
        type: "GET_ERROR",
        payload: { error: null },
      });
    }
  };
  const handleOrderChange = (event) => {
    if (event.target.value) {
      let newChange = {
        order: event.target.value,
        list: [], // Empty repositories and repository count on sort change
        count: 0,
      };
      dispatch({ type: "FETCH_REPOSITORIES", payload: newChange });
      dispatch({
        type: "GET_ERROR",
        payload: { error: null },
      });
    }
  };

  const handleLoadMore = (event) => {
    event.preventDefault();
    dispatch({ type: "SEARCH_LOADING", payload: { loading: true } });
    // Check if dom is loading
    if (!loading) {
      getRepositories(searchString, sort, order, page + 1)
        .then((response) => {
          let newRepositories = [...repositories, ...response.data.items];
          if (response && response.data.items && response.data.items.length) {
            let newChange = {
              list: newRepositories, // Empty repositories and repository count on sort change
              count: response.data.total_count,
              loading: false,
              page: page + 1,
            };
            dispatch({ type: "FETCH_REPOSITORIES", payload: newChange });
            dispatch({
              type: "GET_ERROR",
              payload: { error: null },
            });
          }
        })
        .catch((err) => {
          let error = { message: "error while geting reposetories" };
          dispatch({
            type: "GET_ERROR",
            payload: error,
          });
        });
    }
  };
  const handelSearchRepostories = (event) => {
    event.preventDefault();
    dispatch({ type: "SEARCH_LOADING", payload: { loading: true } });
    // Check if DOM is loading
    if (!loading) {
      getRepositories(searchString, sort, order, 1)
        .then((response) => {
          if (response && response.data.items && response.data.items.length) {
            let newChange = {
              list: response.data.items, // Empty repositories and repository count on sort change
              count: response.data.total_count,
              loading: false,
              page: 1,
            };
            dispatch({ type: "FETCH_REPOSITORIES", payload: newChange });
            dispatch({
              type: "GET_ERROR",
              payload: { error: null },
            });
          }
        })
        .catch((err) => {
          let error = { message: "error while geting reposetories" };
          dispatch({
            type: "GET_ERROR",
            payload: error,
          });
        });
    }
  };
  let loadingElement = [];
  let loadMoreButton = [];
  // Check if loading is enabled or not
  if (loading) {
    loadingElement.push(
      <Spinner
        animation="grow"
        variant="danger"
        height="100"
        className="loader"
        aria-hidden="true"
      />
    );
  }

  // Checking count and pagination limit to display load more button
  if (
    count > Config.PAGINATION_LIMIT &&
    page < count / Config.PAGINATION_LIMIT
  ) {
    loadMoreButton.push(
      <Button
        className="load-more-button mt-4"
        type="submit"
        variant="info"
        onClick={handleLoadMore}
      >
        <FontAwesomeIcon icon={faSyncAlt} /> Load more
      </Button>
    );
  }
  return (
    <div>
      <GithubLogo className="banner-logo" />
      <h3 className="text-center text-info mt-3">Repository Finder</h3>
      <div className="loader">{loadingElement}</div>
      <Form onSubmit={handelSearchRepostories}>
        <Row>
          <Col xs={6}>
            <Form.Group controlId="searchRepositry">
              <Form.Control
                type="text"
                placeholder="Search for repository"
                required
                className="mt-4 search-input"
                onChange={handelSearchFieldChange}
                value={searchString}
              />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Control
                as="select"
                custom
                className="mt-4 sort"
                onChange={handleSortChange}
              >
                <option>Sort by</option>
                <option value="stars">Star</option>
                <option value="forks">Fork</option>
                <option value="help-wanted-issues">Help wanted issue</option>
                <option value="updated">Recently updated</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Control
                as="select"
                custom
                className="mt-4 order"
                onChange={handleOrderChange}
              >
                <option value="desc" defaultValue>
                  Order by descending
                </option>
                <option value="asc">Order by ascending</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button className="search mt-4" type="submit" variant="info">
              Search
            </Button>
          </Col>
        </Row>
        {error && <p className="text-center text-danger mt-3">{error}</p>}
        {count > 0 && (
          <p className="text-center text-info mt-3">
            {count} reposetories found.{" "}
          </p>
        )}
      </Form>
      {repositories.map((repository, index) => (
        <Repositories repository={repository} index={index} />
      ))}
      <div className="load-more">{loadMoreButton}</div>
    </div>
  );
}

// Using react memo to avoid multipe render
export default React.memo(SearchPage);

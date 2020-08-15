import React, { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { ReactComponent as GithubLogo } from "../github.svg";
import Repositories from "./Repositories";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRepositories } from "../services/index";
import Config from "../constants/config";

function SearchPage() {
  // Initialize states
  const [searchString, setSearchString] = useState("");
  // Compining releted information to avoid multiple rendering
  const [searchReposetories, setSearchReposetories] = useState({
    loading: false,
    repositories: [],
    count: 0,
    page: 1,
    error: null,
  });
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("desc");
  // Destructring releted ingormation from searchReposetories
  const { loading, repositories, count, page, error } = searchReposetories;

  const handelSearchRepostories = (event) => {
    event.preventDefault();
    setSearchReposetories((searchReposetories) => ({
      ...searchReposetories,
      loading: true,
    }));
    // Check if DOM is loading
    if (!loading) {
      getRepositories(searchString, sort, order, 1)
        .then((response) => {
          if (response.data.items.length) {
            setSearchReposetories((searchReposetories) => ({
              ...searchReposetories,
              loading: false,
              repositories: response.data.items,
              count: response.data.total_count,
            }));
          }
        })
        .catch((err) => {
          setSearchReposetories((searchReposetories) => ({
            ...searchReposetories,
            loading: false,
            error: "Error while getting reposetories",
          }));
        });
    }
  };

  const handleLoadMore = (event) => {
    event.preventDefault();
    setSearchReposetories((searchReposetories) => ({
      ...searchReposetories,
      loading: true,
    }));
    // Check if DOM is loading
    if (!loading) {
      getRepositories(searchString, sort, order, page + 1)
        .then((response) => {
          // Append incoming reposetories with existing reposetories on load more
          let newRepositories = [...repositories, ...response.data.items];
          if (response.data.items.length) {
            setSearchReposetories((searchReposetories) => ({
              ...searchReposetories,
              loading: false,
              repositories: newRepositories,
              count: response.data.total_count,
              page: page + 1,
            }));
          }
        })
        .catch((err) => {
          setSearchReposetories((searchReposetories) => ({
            ...searchReposetories,
            loading: false,
            error: "Error while getting reposetories",
          }));
        });
    }
  };

  let loadingElement = [];
  let loadMoreButton = [];
  // Check if loading is enabled or not
  if (loading) {
    loadingElement = [
      <Spinner
        animation="grow"
        variant="danger"
        height="100"
        className="loader"
        aria-hidden="true"
      />,
    ];
  }

  // Checking count and pagination limit to display load more button
  if (
    count > Config.PAGINATION_LIMIT &&
    page < count / Config.PAGINATION_LIMIT
  ) {
    loadMoreButton = [
      <Button
        className="load-more-button mt-4"
        type="submit"
        variant="info"
        onClick={handleLoadMore}
      >
        <FontAwesomeIcon icon={faSyncAlt} /> Load more
      </Button>,
    ];
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
                onChange={(e) => setSearchString(e.target.value)}
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
                onChange={(e) => setSort(e.target.value)}
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
                onChange={(e) => setOrder(e.target.value)}
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
            {count} reposetories found
          </p>
        )}
      </Form>

      {searchReposetories.repositories &&
        searchReposetories.repositories.map((repository, index) => (
          <Repositories repository={repository} index={index} />
        ))}
      <div className="load-more">{loadMoreButton}</div>
    </div>
  );
}

// Using react memo to avoid multipe render
export default React.memo(SearchPage);

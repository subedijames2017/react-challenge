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
  // Combining releted information to avoid multiple rendering
  const [searchRepositories, setSearchRepositories] = useState({
    loading: false,
    repositories: [],
    count: 0,
    page: 1,
    error: null,
  });
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("desc");
  // Destructring releted ingormation from searchRepositories
  const { loading, repositories, count, page, error } = searchRepositories;

  const handleSearchRepositories = async (event) => {
    event.preventDefault();
    setSearchRepositories((searchRepositories) => ({
      ...searchRepositories,
      loading: true,
    }));
    // Check if DOM is loading
    if (!loading) {
      try {
        let repositoryResponse = await getRepositories(
          searchString,
          sort,
          order,
          1
        );
        if (repositoryResponse.data.items) {
          setSearchRepositories((searchRepositories) => ({
            ...searchRepositories,
            loading: false,
            repositories: repositoryResponse.data.items,
            count: repositoryResponse.data.total_count,
          }));
        }
      } catch (error) {
        setSearchRepositories((searchRepoitories) => ({
          ...searchRepositories,
          loading: false,
          error: "Error while getting repositories",
        }));
      }
    }
  };

  const handleLoadMore = async (event) => {
    event.preventDefault();
    setSearchRepositories((searchRepositories) => ({
      ...searchRepositories,
      loading: true,
    }));
    // Check if DOM is loading
    if (!loading) {
      try {
        let repositoryResponse = await getRepositories(
          searchString,
          sort,
          order,
          page + 1
        );
        if (repositoryResponse.data.items) {
          // Append incoming repositories with existing repositories on load more
          let newRepositories = [
            ...repositories,
            ...repositoryResponse.data.items,
          ];
          if (repositoryResponse.data.items.length) {
            setSearchRepositories((searchRepositories) => ({
              ...searchRepositories,
              loading: false,
              repositories: newRepositories,
              count: repositoryResponse.data.total_count,
              page: page + 1,
            }));
          }
        }
      } catch (error) {
        setSearchRepositories((searchRepositories) => ({
          ...searchRepositories,
          loading: false,
          error: "Error while getting repositories",
        }));
      }
    }
  };
  let sortOptions = [];
  let loadingElement = [];
  let loadMoreButton = [];
  // options for sort selection
  for (const key in Config.SORT_VALUES) {
    if (Config.SORT_VALUES.hasOwnProperty(key)) {
      sortOptions = [
        ...sortOptions,
        <option value={key} key={key}>
          {Config.SORT_VALUES[key]}
        </option>,
      ];
    }
  }
  // Check if loading is enabled or not
  if (loading) {
    loadingElement = [
      <Spinner
        animation="grow"
        variant="danger"
        height="100"
        className="loader"
        aria-hidden="true"
        key="spinner"
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
    <div className="search-page">
      <GithubLogo className="banner-logo" />
      <h3 className="text-center text-info mt-3">Repository Finder</h3>
      <div className="loader">{loadingElement}</div>
      <Form onSubmit={handleSearchRepositories}>
        <Row>
          <Col xs={6} sm={4}>
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
          <Col xs={2} sm={3}>
            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Control
                as="select"
                custom
                className="mt-4 sort"
                onChange={(e) => setSort(e.target.value)}
              >
                <option>Sort by</option>
                {sortOptions}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={2} sm={3}>
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
          <Col xs={2} sm={2}>
            <Button className="search mt-4" type="submit" variant="info">
              Search
            </Button>
          </Col>
        </Row>
        {error && <p className="text-center text-danger mt-3">{error}</p>}
        {count > 0 && (
          <p className="text-center text-info mt-3">
            {count} repositories found
          </p>
        )}
      </Form>

      {searchRepositories.repositories &&
        searchRepositories.repositories.map((repository, index) => (
          <Repositories repository={repository} index={index} />
        ))}
      <div className="load-more">{loadMoreButton}</div>
    </div>
  );
}

// Using react memo to avoid multipe render
export default React.memo(SearchPage);

import React, { useState } from "react";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { ReactComponent as GithubLogo } from "../github.svg";
import Repositories from "./Repositories";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRepositories } from "../services/index";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("desc");
  const [repositoryCount, setRepositoryCount] = useState(0);
  const [page, setPage] = useState(1);

  const PAGINATION_LIMIT = 50;
  const handelSearchFieldChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSortChange = (event) => {
    if (event.target.value) {
      setSort(event.target.value);
    }
  };
  const handleOrderChange = (event) => {
    if (event.target.value) {
      setOrder(event.target.value);
    }
  };
  const handleLoadMore = (event) => {
    event.preventDefault();
    setLoading(true);
    getRepositories(searchQuery, sort, order, page + 1)
      .then((response) => {
        let newRepositories = [...repositories, ...response.data.items];
        console.log("handleLoadMore -> newRepositories", newRepositories);
        if (response && response.data.items && response.data.items.length) {
          setRepositories(newRepositories);
          setRepositoryCount(response.data.total_count);
        }
        setLoading(false);
        setPage(page + 1);
      })
      .catch((err) => {
        console.log("handelSearchRepostories -> err", err);
      });
  };
  const handelSearchRepostories = (event) => {
    event.preventDefault();
    setLoading(true);
    getRepositories(searchQuery, sort, order, page)
      .then((response) => {
        if (response && response.data.items && response.data.items.length) {
          setRepositories(response.data.items);
          setRepositoryCount(response.data.total_count);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("handelSearchRepostories -> err", err);
      });
  };
  let loadingElement = [];
  let loadMoreButton = [];
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
  console.log("SearchPage -> repositoryCount", repositoryCount);

  if (repositoryCount > 0 && page <= repositoryCount / PAGINATION_LIMIT + 1) {
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
                value={searchQuery}
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
      </Form>
      {repositories.map((repository, index) => (
        <Repositories repository={repository} index={index} />
      ))}
      <div className="load-more">{loadMoreButton}</div>
    </div>
  );
}

export default SearchPage;

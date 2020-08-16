import React, { useEffect, useState } from "react";
import { getUser, getReadme } from "../services/index";
import { Spinner, Container, Col, Image, Row } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";

function Details({ userName, repository }) {
  // Rendering user to search page if no repository information passed
  const history = useHistory();
  if (!repository || !userName) {
    history.push("/");
  }
  const [userInformation, setUserInformation] = useState({
    loading: false,
    user: null,
  });
  const [readme, setReadme] = useState("");

  // Destructuring user information
  const { loading, user } = userInformation;

  // Fetch user information
  async function fetchUserInformation() {
    try {
      const userResponse = await getUser(userName);
      if (userResponse.data) {
        setUserInformation((userInformation) => ({
          loading: false,
          user: userResponse.data,
        }));
      }
    } catch (error) {
      // No error display for now
      console.log("fetchUserInformation -> error", error);
    }
  }
  // Fetch readme data for repository
  // Using different function to fetch readme, because fetch readme fails with status 400 in case of no redme for a repository.
  async function fetchReadme() {
    try {
      const readmeResponse = await getReadme(userName, repository.name);
      if (readmeResponse.data) {
        setReadme(readmeResponse.data);
      }
    } catch (error) {
      console.log("fetchReadme -> error", error);
    }
  }
  useEffect(() => {
    setUserInformation((userInformation) => ({
      ...userInformation,
      loading: true,
    }));
    fetchUserInformation();
    fetchReadme();
  }, []);
  let displayContent = [];
  // Checking repositoryCount and pagination limit to display load more button
  if (loading || !user) {
    displayContent = [
      <Spinner
        animation="grow"
        variant="danger"
        className="loader"
        aria-hidden="true"
      />,
    ];
  }
  if (user && repository) {
    displayContent = [
      <Container>
        <Row>
          <Link to="/" className="text-info">
            <FontAwesomeIcon
              icon={faArrowCircleLeft}
              className="back"
              size="2x"
            />
          </Link>
        </Row>
        <Row>
          <Col xs={3}>
            <Image
              src={user.avatar_url}
              roundedCircle
              height="200"
              width="200"
              className="avatar"
            />
          </Col>
          <Col xs={9}>
            <a href={user.html_url} target="_blank" className="link-tag">
              <h4 className="mt-3">
                Name: {user.name ? user.name : user.login}
              </h4>
            </a>
            <a href={repository.html_url} target="_blank" className="link-tag">
              <h4 className="mt-3">Repository: {repository.name}</h4>
            </a>
            <h4 className="mt-3">Open issues: {repository.open_issues}</h4>
            <h4 className="mt-3">
              Default branch: {repository.default_branch}
            </h4>
          </Col>
        </Row>
        {readme && (
          <div className="readme">
            <Row className="mt-4">
              <h2 className="text-center">README.md</h2>
            </Row>
            <Row className="mt-4">
              <ReactMarkdown source={atob(readme.content)} escapeHtml={false} />
            </Row>
          </div>
        )}
      </Container>,
    ];
  }
  return <div className="detail-page">{displayContent}</div>;
}
// Using react memo to avoid multiple render
export default React.memo(Details);

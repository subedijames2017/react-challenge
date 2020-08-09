import React, { useEffect } from "react";
import { getUser } from "../services/index";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

const Details = React.memo(function Details(props) {
  let repository = props.history.location.repository;
  let login = props.login;
  if (!repository) {
    props.history.push("/");
  }
  const user = useSelector((state) => state.userState.user);
  const loading = useSelector((state) => state.userState.loading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "USER_LOADING", payload: { loading: true } });
    getUser(login)
      .then((resp) => {
        if (resp && resp.data) {
          let newChange = {
            user: resp.data,
            loading: false,
          };
          // Set user
          dispatch({ type: "FETCH_USER", payload: newChange });
        }
      })
      .catch((err) => {
        console.log("Details -> err", err);
      });
    // Clear user after unmount
    return () => {
      let newChange = {
        user: null,
        loading: false,
      };
      dispatch({ type: "FETCH_USER", payload: newChange });
    };
  }, []);
  let displayContent = [];
  // Checking repositoryCount and pagination limit to display load more button
  if (loading || !user) {
    displayContent.push(
      <Spinner
        animation="grow"
        variant="danger"
        className="loader"
        aria-hidden="true"
      />
    );
  }
  if (user) {
    displayContent.push(<p>{user.name}</p>);
  }
  return <div>{displayContent}</div>;
});
export default Details;

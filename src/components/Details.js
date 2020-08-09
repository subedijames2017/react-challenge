import React, { useEffect } from "react";
import { getUser } from "../services/index";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";

function Details(props) {
  console.log("Details -> name", props.history.location.repository);
  console.log("james");
  if (!props.history.location.repository) {
    props.history.push("/");
  }
  // const user = useSelector((state) => state.userState.user);
  // const loading = useSelector((state) => state.userState.loading);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch({ type: "LOADING", payload: { loading: true } });
  //   getUser(login)
  //     .then((resp) => {
  //       if (resp && resp.data) {
  //         // setUser(resp.data);
  //         let newChange = {
  //           user: resp.data,
  //           loading: false,
  //         };
  //         dispatch({ type: "FETCH_USER", payload: newChange });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("Details -> err", err);
  //     });
  // });
  // let displayContent = [];
  // // Checking repositoryCount and pagination limit to display load more button
  // if (loading || !user) {
  //   displayContent.push(
  //     <Spinner
  //       animation="grow"
  //       variant="danger"
  //       className="loader"
  //       aria-hidden="true"
  //     />
  //   );
  // }
  return <div>james</div>;
}
export default Details;

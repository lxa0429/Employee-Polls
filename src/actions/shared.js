import { getInitialData } from "../utils/api";
import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const AUTHED_ID = "";

export function handleInitialData() {
  return (dispatch, getState) => {
    dispatch(showLoading());

    // Access the current state to get the existing authenticated user
    const { authedUser } = getState();
    const existingAuthenticatedUser = localStorage.getItem("authedUser_in_storage") || AUTHED_ID;
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
      dispatch(setAuthedUser(existingAuthenticatedUser));
      dispatch(hideLoading());
    });
  };
}
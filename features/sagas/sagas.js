import { takeEvery } from "redux-saga/effects";
import { GET_USERS } from "../actions";
import getUsers from "./handlers/users";

function* rootSaga() {
  yield takeEvery(GET_USERS, getUsers);
}

export default rootSaga;

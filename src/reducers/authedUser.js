import { SET_AUTHED_USER, LOGOUT } from '../actions/authedUser'

export default function authedUser(state = null, action) {
  console.log('Previous authedUser state:', state);
  console.log('Action dispatched:', action);

  switch (action.type) {
    case SET_AUTHED_USER:
      console.log('Setting authedUser to:', action.id);
      return action.id;
    case LOGOUT:
      console.log('Logging out, setting authedUser to null');
      return null;
    default:
      return state;
  }
}


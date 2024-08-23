import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './Layout';
import PrivateRoute from './PrivateRoute';
import Home from './Home'
import PollDetails from './PollDetails'
import NewPoll from './NewPoll'
import Leaderboard from './Leaderboard'
import Login from './Login'
import { handleInitialData } from "../actions/shared";
import { LoadingBar } from 'react-redux-loading-bar';
import NotFound from './NotFound';

function App() {
  const dispatch = useDispatch();
  
  // Selectors to get the state from Redux store
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);
  const questions = useSelector((state) => state.questions);
  const loading = useSelector((state) => state.loadingBar.default > 0);

  // Fetch initial data on component mount
  useEffect(() => {
    const existingAuthenticatedUser = localStorage.getItem("authedUser_in_storage");
    console.log("existingAuthenticatedUser b4 handle data: ", existingAuthenticatedUser)
    dispatch(handleInitialData())
      .then(() => {
        console.log("Users: ", users); 
        console.log("Polls: ", questions);
      })
      .catch((error) => {
        console.error('Error fetching initial data:', error);
      });
  }, [dispatch]);

  // Log the authedUser state to help debug the issue
  useEffect(() => {
    console.log("authedUser in App:", authedUser);
  }, [authedUser]);

  return (
    <Router>
      <LoadingBar />
      <div className="container">
      {loading === true ? null : ( 
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PrivateRoute component={Home} />} />
          <Route path="questions/:id" element={<PrivateRoute component={PollDetails} />} />
          <Route path="add" element={<PrivateRoute component={NewPoll} />} />
          <Route path="leaderboard" element={<PrivateRoute component={Leaderboard} />} />
        </Route>
        <Route path="/login" element={<Login props_users={users} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
       )}
      </div>
    </Router>
  )
}

export default App;

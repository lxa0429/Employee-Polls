import '../index.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authedUser';
import { useNavigate } from 'react-router-dom';

function Nav() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const authedUser = useSelector((state) => state.authedUser);
  const users = useSelector((state) => state.users);
  console.log("users in Nav: ", users);
  
  const currentUser = Object.values(users).find(user => user.id === authedUser);
  console.log("current user in nav: ", currentUser)
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  console.log("authedUser in Nav: ", authedUser);
  return (
    <nav className='nav'>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add">New Poll</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li style={{ color: 'blue' }}>{ currentUser?.name }</li>
        {authedUser ? (
        <>
        <li><button onClick={handleLogout}>Logout</button></li>
        </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}        
      </ul>
    </nav>
  )
}

export default Nav

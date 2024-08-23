import '../css/Login.css';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = (props) => {
  const users = props.props_users;
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedPassword, setSelectedPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    if (Object.values(users).find(user => user.password === selectedPassword && user.id === selectedUserId)) {
      localStorage.setItem("authedUser_in_storage", selectedUserId);
      dispatch(setAuthedUser(selectedUserId));
      const targetUrl = new URLSearchParams(location.search).get('targetUrl');
      navigate(targetUrl || '/');
    } else {
      alert('Invalid user ID or password.');
    }
  };

  useEffect(() => {
    if (props.authedUser) {
      navigate('/');
    }
  }, [props.authedUser, navigate]);

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <select
            id="userId"
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(e.target.value)}
          >
            <option value="">Select User ID</option>
            {Object.keys(users).map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <select
            id="password"
            value={selectedPassword}
            onChange={(e) => setSelectedPassword(e.target.value)}
          >
            <option value="">Select Password</option>
            {Object.keys(users).map((id) => (
              <option key={id} value={users[id].password}>
                {users[id].password}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" onClick={handleLogin} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

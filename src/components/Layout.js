import '../index.css'
import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Layout = () => (
  <div>
    <Nav className="nav" />
    <main>
      <Outlet />
    </main>
  </div>
);

export default Layout;
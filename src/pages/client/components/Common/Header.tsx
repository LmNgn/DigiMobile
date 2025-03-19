import React from 'react';
import Topbar from '../Layout/Topbar';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
  return (
    <header className="border-bottom">
      <Topbar />
      <Navbar />
    </header>
  );
};

export default Header;
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function Header() {
    const addRoute = '/add';
    const homeRoute = '/';

    return (
      <div className="d-flex justify-content-center align-items-center">
        <Link to={homeRoute}><img src='/images/icon.jpg' className='header-img m-2' alt='Header image'/></Link>
        <h1 className="board-header m-2">Message Board</h1>
        <Link to={addRoute} className='add-button m-2'>
          Add Message
        </Link>
      </div>
    );
  }

export default Header
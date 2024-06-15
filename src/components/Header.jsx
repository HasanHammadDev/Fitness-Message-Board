import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import AddMessage from './AddMessage';

function Header({ toggleVisibility }) {
    return (
      <div className="d-flex justify-content-center">
        <img src='images/dumbbell.jpg' className='header-img' alt='Header image'/>
        <h1 className="board-header m-2">Message Board</h1>
        <Button onClick={toggleVisibility} className='add-button py-0'>
          Add Message
        </Button>
      </div>
    );
  }

export default Header
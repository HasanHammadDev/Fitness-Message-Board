import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


function Header() {
    return(
    <div className=" d-flex justify-content-center">
        <h1 className="board-header m-2">Message Board</h1>
        <Button className='add-button py-0'>Add Message</Button>
    </div>
    );
}

export default Header
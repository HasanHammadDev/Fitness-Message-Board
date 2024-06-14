import React from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddMessage() {
  return (
    <div className="form-wrapper d-flex justify-content-center mt-5">
      <Form className="message-form border d-flex flex-column align-items-start p-4">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label className="fw-bold">Username</Form.Label>
          <Form.Control type="text" placeholder="Enter Username" />
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="formBasicPost">
          <Form.Label className="fw-bold">Post</Form.Label>
          <Form.Control as="textarea" rows={5} className="message-textarea" placeholder="Enter your post here" />
        </Form.Group>

        <div className="d-flex w-100 justify-content-between">
          <Form.Group className="mb-3 me-3 flex-grow-1" controlId="formBasicImage">
            <Form.Label className="fw-bold">Picture</Form.Label>
            <Form.Control type="file" accept="image/*" />
          </Form.Group>
          
          <Form.Group className="mb-3 flex-grow-1" controlId="formBasicVideo">
            <Form.Label className="fw-bold">Video</Form.Label>
            <Form.Control type="file" accept="video/*" />
          </Form.Group>
        </div>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Post
        </Button>
      </Form>
    </div>
  );
}

export default AddMessage;
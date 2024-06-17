import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { addMessage } from "../MessageApi";

function AddMessage() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ username: "", title: "", post: "" });

  function handleChange(name, value) {
    setInputs((values) => ({ ...values, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    const message = {
      username: inputs.username,
      title: inputs.title,
      message: inputs.post,
    };

    await addMessage(message);
    goBack();
  }

  function goBack() {
    navigate("/");
  }

  return (
    <div className={`form-wrapper d-flex justify-content-center mt-2 mb-3`}>
      <Form
        onSubmit={handleSubmit}
        className="message-form border d-flex flex-column align-items-start p-4"
      >
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label className="fw-bold">Username</Form.Label>
          <Form.Control
            onChange={(e) => handleChange("username", e.target.value)}
            type="text"
            placeholder="Enter Username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicTitle">
          <Form.Label className="fw-bold">Title</Form.Label>
          <Form.Control
            onChange={(e) => handleChange("title", e.target.value)}
            type="text"
            placeholder="Enter Title"
          />
        </Form.Group>

        <Form.Group className="mb-3 w-100" controlId="formBasicPost">
          <Form.Label className="fw-bold">Share your thoughts*</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            className="message-textarea"
            placeholder="Enter your post here"
            onChange={(e) => handleChange("post", e.target.value)}
          />
        </Form.Group>

        <div className="d-flex w-100 justify-content-between">
          <Form.Group
            className="mb-3 me-3 flex-grow-1"
            controlId="formBasicImage"
          >
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
        <div className="d-flex w-100 justify-content-start">
          <Button
            onClick={handleSubmit}
            className="m-1"
            variant="primary"
            type="submit"
          >
            Post
          </Button>

          <Button
            className="m-1"
            variant="secondary"
            type="button"
            onClick={goBack}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default AddMessage;

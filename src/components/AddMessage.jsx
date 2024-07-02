import React from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { addMessage } from "../MessageApi";

function AddMessage() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [inputs, setInputs] = useState({
    username: "",
    title: "",
    post: "",
    category: "",
    image: null,
  });

  function handleChange(name, value) {
    if (name === "image") {
      setInputs((values) => ({ ...values, [name]: value.target.files[0] }));
    } else {
      setInputs((values) => ({ ...values, [name]: value }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append("title", inputs.title);
    formData.append("message", inputs.post);
    formData.append("category", inputs.category);
    if (inputs.image) {
      formData.append("image", inputs.image);
    }

    if(inputs.username) {
      formData.append("username", inputs.username);
    }
  
    const postRequest = await addMessage(formData);
    if (inputs.title === ''|| inputs.category === ''|| inputs.post === '') {
      setError(true)
      setErrorMsg('Please fill all the required fields.')
    } else if (postRequest.error){
      setError(true)
      setErrorMsg('There was an error with uploading your post. Please try again later.')
    } else {
      goBack();
    }
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
        <p className="fw-bold">* Indicates Required Fields</p>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label className="fw-bold">Username</Form.Label>
          <Form.Control
            onChange={(e) => handleChange("username", e.target.value)}
            type="text"
            placeholder="Enter Username"
          />
        </Form.Group>

        <div className="d-flex">
          <Form.Group className="mb-3" controlId="formBasicTitle">
            <Form.Label className="fw-bold">Title *</Form.Label>
            <Form.Control
              onChange={(e) => handleChange("title", e.target.value)}
              type="text"
              placeholder="Enter Title"
            />
          </Form.Group>

          <Form.Group className="mb-3 mx-3" controlId="formBasicCategory">
            <Form.Label className="fw-bold">Category *</Form.Label>
            <Form.Control
              onChange={(e) => handleChange("category", e.target.value)}
              as="select"
              placeholder="Enter Category"
            >
              <option value="" disabled selected>Select a category</option>
              <option value="Push">Push</option>
              <option value="Pull">Pull</option>
              <option value="Legs">Legs</option>
              <option value="Nutrition">Nutrition</option>
            </Form.Control>
          </Form.Group>
        </div>

        <Form.Group className="mb-3 w-100" controlId="formBasicPost">
          <Form.Label className="fw-bold">Description *</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            className="message-textarea"
            placeholder="Enter Your Description Here"
            onChange={(e) => handleChange("post", e.target.value)}
          />
        </Form.Group>

        <div className="d-flex w-100 justify-content-between">
          <Form.Group
            className="mb-3 me-3"
            controlId="formBasicImage"
          >
            <Form.Label className="fw-bold">Picture</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={(e) => handleChange("image", e)} />
          </Form.Group>

        </div>
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
        {error && <h4 className="mt-2">{errorMsg}</h4>}
      </Form>
    </div>
  );
}

export default AddMessage;

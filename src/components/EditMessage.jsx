import { Form, Button, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMessage, editMessage } from "../MessageApi";

function EditMessage() {
  const { messageId } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    title: "",
    messageText: "",
  });
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  function handleChange(name, value) {
    setInputs((values) => ({ ...values, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const messagePart = {
      username: inputs.username,
      title: inputs.title,
      message: inputs.messageText,
    };

    await editMessage(messageId, messagePart);
    goBack();
  }

  function goBack() {
    navigate("/");
  }

  useEffect(() => {
    async function loadMessage() {
      if (retry) {
        setIsLoading(true);
      }
      const message = await getMessage(messageId);
      if (message.error) {
        setError(true);
        setRetry(false);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setRetry(false);
        setInputs({
          username: message.username,
          title: message.title,
          messageText: message.message,
        });
      }
    }

    loadMessage();
  }, [messageId, retry]);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : (
        <>
          {" "}
          {error ? (
            <div className="d-flex justify-content-center align-items-center">
              <h1 className="error-heading">
                There was an error loading the message you're trying to edit.
              </h1>
              <Button onClick={() => setRetry(true)}>Retry</Button>
            </div>
          ) : (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={inputs.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={inputs.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="messageText">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={inputs.messageText}
                  onChange={(e) => handleChange("messageText", e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="me-2">
                Save
              </Button>
              <Button variant="secondary" type="button" onClick={goBack}>
                Cancel
              </Button>
            </Form>
          )}
        </>
      )}
    </>
  );
}

export default EditMessage;

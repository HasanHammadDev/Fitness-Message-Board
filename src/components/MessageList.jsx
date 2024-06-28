import { useState, useEffect } from "react";
import Message from "./Message";
import { Link } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { getMessages, deleteMessage } from "../MessageApi";

function MessageList() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retry, setRetry] = useState(false);

  function deleteFromList(messageId) {
    // Delete message from database
    deleteMessage(messageId);

    // Delete message from message list
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message._id !== messageId)
    );
  }

  useEffect(() => {
    async function getAllMessages() {
      if (retry) {
        setIsLoading(true);
      }
      const messages = await getMessages();
      if (messages.error) {
        setError(true);
        setIsLoading(false);
        setRetry(false);
      } else {
        setError(false);
        setMessages(messages);
        setIsLoading(false);
        setRetry(false);
      }
    }

    getAllMessages();
  }, [retry]);

  return (
    <>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <Spinner />
        </div>
      ) : (
        <>
          {error ? (
            <div className="d-flex align-items-center justify-content-center">
              <h1 className="error-heading">
                There was an error fetching messages.
              </h1>
              <Button onClick={() => setRetry(true)}>Retry</Button>
            </div>
          ) : (
            <>
              <div className="d-flex justify-content-center align-items-center">
                <Link className="beacon" to="/filtered">
                  <Button className="filter-button">Filter &#x25bc;</Button>
                </Link>
              </div>
              {messages.map((message) => (
                <Message
                  key={message._id}
                  value={message}
                  delete={deleteFromList}
                />
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}

export default MessageList;

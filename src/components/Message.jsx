import { Card, CloseButton } from "react-bootstrap";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

function Message(props) {
    const message = props.value;
    const deleteMessage = props.delete;
    const editRoute = `/edit/${message._id}`;

  return (
    <div className="m-2 d-flex justify-content-center">
      <Card className="message-card mb-3">
        <Card.Body>
          <CloseButton className="float-end" onClick={() => deleteMessage(message._id)}/>
          <Card.Title>{message.title}</Card.Title>
          <Link to={editRoute} className="float-end fw-bold">Edit&#x270E;</Link>

          <Card.Text>
            {message.message}
          </Card.Text>

          {/* {mediaType === 'image' ? (
          <Card.Img variant="top" src={mediaUrl} alt="Card media" />
        ) : (
          <video className="card-img-top" controls>
            <source src={mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )} */}

        </Card.Body>
        <Card.Footer className="text-muted">
          <ReactTimeAgo date={new Date(message.timestamp)} locale='en-US'/>
          <Card.Text className="float-end">By {message.username}</Card.Text>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Message;

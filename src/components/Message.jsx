import { Card, CloseButton } from "react-bootstrap";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { useTheme } from '../context/ThemeContext';

function Message(props) {
    const message = props.value;
    const deleteMessage = props.delete;
    const editRoute = `/edit/${message._id}`;
    const { theme } = useTheme();

  return (
    <div className={`${theme} m-3 d-flex justify-content-center`}>
      <Card className="message-card mb-3">
        <Card.Body>
          <CloseButton className="float-end" onClick={() => deleteMessage(message._id)}/>
          <Card.Title>{message.title}</Card.Title>
          <Link to={editRoute} className="edit-btn float-end fw-bold">Edit&#x270E;</Link>

          <Card.Text>
            {message.message}
          </Card.Text>

          {message.imageUrl ? <Card.Img className="card-image" src={message.imageUrl} alt="Card image" /> : <></>}

        </Card.Body>
        <Card.Footer className="text-muted">
          <ReactTimeAgo className="time-posted" date={new Date(message.timestamp)} locale='en-US'/>
          <Card.Text className="message-category float-end"><b>{message.category} {message.category === "Nutrition" ? "" : "Workout"}</b> By {message.username}</Card.Text>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default Message;

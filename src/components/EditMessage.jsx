import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMessage, editMessage } from "../MessageApi";

function EditMessage() {
   const { messageId } = useParams();
   const navigate = useNavigate();
   const [inputs, setInputs] = useState({ username: "", messageText: "" });

   function handleChange(name, value) {
      setInputs(values => ({ ...values, [name]: value }));
   }

   async function handleSubmit(event) {
      event.preventDefault();

      const messagePart = {
         username: inputs.username,
         text: inputs.messageText
      };

      await editMessage(messageId, messagePart);
      goBack();
   }

   function goBack() {
      navigate("/");
   }

   useEffect(() => {
      async function loadMessage() {
         const message = await getMessage(messageId);
         setInputs({ 
            username: message.username, 
            messageText: message.text 
         });
      }

      loadMessage();
   }, [messageId]);

   return (
      <Form onSubmit={handleSubmit}>
         <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text"
               value={inputs.username}
               onChange={(e) => handleChange("username", e.target.value)} />
         </Form.Group>
         <Form.Group className="mb-3" controlId="messageText">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3}
               value={inputs.messageText}
               onChange={(e) => handleChange("messageText", e.target.value)} />
         </Form.Group>
         <Button variant="primary" type="submit" className="me-2">
            Save
         </Button>
         <Button variant="secondary" type="button" onClick={goBack}>
            Cancel
         </Button>
      </Form>
   );
}

export default EditMessage;
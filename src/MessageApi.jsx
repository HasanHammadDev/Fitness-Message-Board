const apiEndpoint = "http://localhost:3000/messages";

//Load existing messages
async function getMessages(categories) {
   try {
      let response;
      if(categories && categories.length > 0) {
         response = await fetch(`${apiEndpoint}?categories=${categories}`);
      } else {
         response = await fetch(`${apiEndpoint}`);
      }

      if (!response.ok) {
         console.error('Failed to fetch messages:', response);
         return null;
      }
      return await response.json();
   } catch (error) {
      console.error('Error fetching messages:', error);
      return null;
   }
}

//Get message selected for editing
async function getMessage(messageId) {
   try {
      const response = await fetch(`${apiEndpoint}/${messageId}`);
      if (!response.ok) {
         console.error(`Failed to fetch message ${messageId}:`, response);
         return null;
      }
      return await response.json();
   } catch (error) {
      console.error(`Error fetching message ${messageId}:`, error);
      return null;
   }
}


//Post a message
async function addMessage(formData) {
   try {
       const response = await fetch(apiEndpoint, {
           method: "POST",
           body: formData,
       });

       if (!response.ok) {
           console.error('Failed to add message:', response);
           return null;
       }
       return await response.json();
   } catch (error) {
       console.error('Error adding message:', error);
       return null;
   }
}


async function editMessage(messageId, messagePart) {
   try {
      const response = await fetch(`${apiEndpoint}/${messageId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(messagePart),
      });
      if (!response.ok) {
         console.error(`Failed to edit message ${messageId}:`, response);
         return null;
      }
      return await response.json();
   } catch (error) {
      console.error(`Error editing message ${messageId}:`, error);
      return null;
   }
}

async function deleteMessage(messageId) {
   try {
      const response = await fetch(`${apiEndpoint}/${messageId}`, {
         method: "DELETE",
      });
      if (!response.ok) {
         console.error(`Failed to delete message ${messageId}:`, response);
         return null;
      }
      return await response.json();
   } catch (error) {
      console.error(`Error deleting message ${messageId}:`, error);
      return null;
   }
}

export {      
   getMessages,
   getMessage,
   addMessage,
   editMessage,
   deleteMessage
};
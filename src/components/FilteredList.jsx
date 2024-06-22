import Message from "./Message";

function FilteredList({ filteredMessages }) {
    function deleteFromList(messageId) {
        // Delete message from database
        deleteMessage(messageId);
    
        // Delete message from message list
        setMessages((prevMessages) =>
          prevMessages.filter((message) => message._id !== messageId)
        );
      }

    return(
        filteredMessages.map((message) => (
            <Message
              key={message._id}
              value={message}
              delete={deleteFromList}
            />
          ))
    );
}

export default FilteredList;
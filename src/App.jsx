import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import MessageList from "./components/MessageList";
import AddMessage from "./components/AddMessage";
import EditMessage from "./components/EditMessage";

function App() {
   return (
      <Container className="mt-3">
         <Header />
         <Routes>
            <Route path="/" element={<MessageList />} />
            <Route path="/add" element={<AddMessage />} /> 
            <Route path="/edit/:messageId" element={<EditMessage />} />           
         </Routes>         
      </Container>
   );
}

export default App;
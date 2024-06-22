import { Route, Routes } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import MessageList from "./components/MessageList";
import AddMessage from "./components/AddMessage";
import EditMessage from "./components/EditMessage";
import FilterComponent from "./components/FilterComponent";
import "./styles/App.scss";
import { useTheme } from "./context/ThemeContext";

function App() {
  const { theme } = useTheme();

  return (
    <div className={`${theme}-mode`}>
      <Container className="">
        <Header />
        <Routes>
          <Route path="/" element={<MessageList />} />
          <Route path="/add" element={<AddMessage />} />
          <Route path="/edit/:messageId" element={<EditMessage />} />
          <Route path="/filtered" element={<FilterComponent />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;

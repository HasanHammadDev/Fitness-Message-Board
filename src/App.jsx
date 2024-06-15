import { useState } from 'react'
import AddMessage from './components/AddMessage'
import Message from './components/Message'
import Header from './components/Header'
import MessageList from './components/MessageList';



export default function App() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <>
      <Header toggleVisibility={toggleVisibility}/>
      <AddMessage isVisible={isVisible}/>
      <MessageList></MessageList>
    </>
  ) 
}

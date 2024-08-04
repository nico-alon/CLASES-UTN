import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Components/Header.jsx';
import Home from './Pages/Chat.jsx';
import Chat from './Pages/Home.jsx';


const App = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setMessages(storedMessages);
  }, []);

  const addMessage = (newMessage) => {
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  return (
    <Router>
      <div className="app">
        <Header className="header" />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workspace/:workspaceId/:channelId" element={<Chat messages={messages} addMessage={addMessage} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;

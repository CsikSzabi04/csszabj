import { useState } from 'react';
import LuHeader from './Lu/LuHeader';
import LuMessages from './Lu/LuMessages';
import LuInput from './Lu/LuInput';
import './Lu.css';

export default function LuInterface() {
  const [messages, setMessages] = useState([
    { 
      text: "Hello, I'm Lu. Click if I can assist!", 
      sender: 'lu',
      timestamp: new Date(),
      loading: false
    }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);

  const handleSend = async (input) => {
    if (!input.trim()) return;

    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
      loading: false
    };

    setMessages(prev => [...prev, userMessage, {
      text: '',
      sender: 'lu',
      timestamp: new Date(),
      loading: true
    }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          text: (
            <>
              I received: "{input}". <br /><br />
              This would be the AI response in production if Szabolcs would make me already &gt;(.
            </>
          ),
          sender: 'lu',
          timestamp: new Date(),
          loading: false
        };
        return newMessages;
      });
    }, 1000);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`lu-interface bg-gray-800 ${isMinimized ? 'lu-minimized' : ''}`}>
      <LuHeader 
        isListening={isListening} 
        onVoiceToggle={() => setIsListening(!isListening)}
        onMinimizeToggle={toggleMinimize}
        isMinimized={isMinimized}
      />
      {!isMinimized && (
        <>
          <LuMessages messages={messages} />
          <LuInput 
            onSend={handleSend} 
            isListening={isListening}
            onVoiceToggle={() => setIsListening(!isListening)}
          />
        </>
      )}
    </div>
  );
}
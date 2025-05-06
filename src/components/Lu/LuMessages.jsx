import { useEffect, useRef } from 'react';

export default function LuMessages({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="lu-messages bg-gray-900">
      {messages.map((msg, i) => (
        <div 
          key={i} 
          className={`p-3 max-w-[80%] relative ${msg.sender === 'lu' 
            ? 'bg-gradient-to-br from-gray-700 to-gray-800 rounded-r-lg rounded-tl-lg ml-3 mr-auto text-white' 
            : 'bg-gradient-to-br from-gray-600 to-gray-500 rounded-l-lg rounded-tr-lg mr-3 ml-auto text-white'}`}
          style={{ 
            marginTop: i === 0 ? '8px' : '4px',
            marginBottom: '4px'
          }}
        >
          {msg.loading ? (
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          ) : (
            <>
              <p className="text-sm">{msg.text}</p>
              <span className="text-xs opacity-60 block mt-1 text-right">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
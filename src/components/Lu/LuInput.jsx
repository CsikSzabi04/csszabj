export default function LuInput({ onSend, isListening, onVoiceToggle, inputText, setInputText,setIsListening,setMessages  }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSend(inputText);
      setInputText('');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="lu-input bg-gray-800">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={async () => {
            if (isListening) {
              setIsListening(false);
            } else {
              const hasPermission = await checkMicrophonePermission();
              if (hasPermission) {
                setIsListening(true);
              } else {
                setMessages(prev => [...prev, {
                  text: 'Microphone access is blocked. Please enable it in your browser settings.',
                  sender: 'lu',
                  timestamp: new Date(),
                  loading: false
                }]);
              }
            }
          }}
          className={`p-2 rounded-full ${isListening
            ? 'bg-red-500 animate-pulse'
            : 'bg-gray-700 hover:bg-gray-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        </button>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={isListening ? "Listening..." : "Type a message..."}
          className="flex-1 text-white bg-gray-700 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="bg-purple-600 p-2 rounded-full hover:bg-purple-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>
    </form>
  );
}
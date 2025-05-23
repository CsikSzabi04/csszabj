export default function LuHeader({ isListening, onVoiceToggle, onMinimizeToggle, isMinimized }) {
    return (
      <div 
        className="lu-header bg-gray-700 flex items-center justify-between"
        onClick={onMinimizeToggle}
      >
        <div className="flex items-center gap-3">
          <div className="lu-avatar w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xl">👑</span>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Lu </h2>
            <p className="text-xs text-purple-300">
              {isMinimized ? "Szabolcs' assistant" : (isListening ? 'Listening...' : 'Online')}
            </p>
          </div>
        </div>
        
        {!isMinimized && (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onVoiceToggle();
            }}
            className={`p-1 rounded-full ${isListening 
              ? 'bg-red-500 animate-pulse' 
              : 'bg-gray-600 hover:bg-gray-500'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </button>
        )}
      </div>
    );
  }
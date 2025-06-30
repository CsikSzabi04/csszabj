import { useState, useEffect, useRef } from 'react';
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
  const [interimText, setInterimText] = useState('');
  const [inputText, setInputText] = useState('');
  const recognitionRef = useRef(null);

  const playlists = {
    share: {
      id: 'PLsjJuGNBBP8s0r1vXcxtIMGxmpf8KaIB1',
      aliases: ['share playlist', 'share', 'első', 'nosztalgia', 'nostalgia', 'asd']
    },
    mammamia: {
      id: 'PLsjJuGNBBP8tTxpxHmKjFDWA3VMZow88A',
      aliases: ['mamma mia', 'mamma mia playlist', 'abba', 'mammamia']
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'hu-HU';

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setInterimText(interimTranscript);
      setInputText(interimTranscript);

      if (finalTranscript) {
        handleSend(finalTranscript);
        setIsListening(false);
        setInterimText('');
        setInputText('');
      }
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);

      // Handle specific error cases
      switch (event.error) {
        case 'network':
          setMessages(prev => [...prev, {
            text: 'Network error. Please check your connection.',
            sender: 'lu',
            timestamp: new Date(),
            loading: false
          }]);
          break;
        case 'not-allowed':
        case 'service-not-allowed':
          setMessages(prev => [...prev, {
            text: 'Microphone access denied. Please allow microphone permissions.',
            sender: 'lu',
            timestamp: new Date(),
            loading: false
          }]);
          break;
        default:
          setMessages(prev => [...prev, {
            text: 'Error with voice recognition. Try again or type your message.',
            sender: 'lu',
            timestamp: new Date(),
            loading: false
          }]);
      }

      setIsListening(false);
      setInterimText('');
    };

    recognition.onend = () => {
      // Only restart if we're still supposed to be listening
      // and there wasn't an error
      if (isListening && !recognition.error) {
        try {
          recognition.start();
        } catch (e) {
          console.error('Failed to restart recognition:', e);
          setIsListening(false);
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.onend = null; // Remove handler to prevent restart
      recognition.stop();
    };



  }, [isListening]);

  useEffect(() => {
    if (isListening) {
      try {
        recognitionRef.current?.start();
        setMessages(prev => [...prev, {
          text: 'Listening... Speak now',
          sender: 'lu',
          timestamp: new Date(),
          loading: false
        }]);
      } catch (e) {
        console.error('Failed to start recognition:', e);
        setIsListening(false);
        setMessages(prev => [...prev, {
          text: 'Failed to start voice recognition. Try again.',
          sender: 'lu',
          timestamp: new Date(),
          loading: false
        }]);
      }
    } else {
      recognitionRef.current?.stop();
    }
  }, [isListening]);

  useEffect(() => {
    if (isListening) {
      recognitionRef.current?.start();
      setMessages(prev => [...prev, {
        text: 'Listening... Speak now',
        sender: 'lu',
        timestamp: new Date(),
        loading: false
      }]);
    } else {
      recognitionRef.current?.stop();
    }
  }, [isListening]);

  const handleSend = async (input) => {
    if (!input.trim()) return;

    const lowerInput = input.toLowerCase();

    // Skip wake words
    const wakeRegex = /^(lu|hey lu|hello lu|listen up)$/i;
    if (wakeRegex.test(input.trim())) return;

    const userMsg = {
      text: input,
      sender: 'user',
      timestamp: new Date(),
      loading: false
    };

    setMessages(prev => [...prev, userMsg, {
      text: '',
      sender: 'lu',
      timestamp: new Date(),
      loading: true
    }]);

    // Stop commands
    if (
      lowerInput.includes('állítsd le') ||
      lowerInput.includes('hagyd abba') ||
      lowerInput.includes('stop') ||
      lowerInput.includes('stop playing') ||
      lowerInput.includes('stop the music') ||
      lowerInput.includes('ne játszd') ||
      lowerInput.includes('állj le')
    ) {
      setTimeout(() => {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            text: 'Music stopped. 🛑',
            sender: 'lu',
            timestamp: new Date(),
            loading: false
          };
          return newMessages;
        });
      }, 1000);
      return;
    }

    // Playlist detection
    let matchedPlaylist = null;
    Object.entries(playlists).forEach(([key, pl]) => {
      pl.aliases.forEach(alias => {
        const a = alias.toLowerCase();
        if (
          lowerInput.includes(`play my ${a}`) ||
          lowerInput.includes(`play ${a}`) ||
          lowerInput.includes(`start my ${a}`) ||
          lowerInput.includes(`open my ${a}`) ||
          lowerInput.includes(`játszd le a ${a}`) ||
          lowerInput.includes(`indítsd el a ${a}`) ||
          lowerInput.includes(`nyisd meg a ${a}`) ||
          (lowerInput.includes('play') && lowerInput.includes(a)) ||
          (lowerInput.includes('játsz') && lowerInput.includes(a)) ||
          (lowerInput.includes('start') && lowerInput.includes(a)) ||
          (lowerInput.includes('indít') && lowerInput.includes(a))
        ) {
          matchedPlaylist = pl;
        }
      });
    });

    if (matchedPlaylist) {
      setTimeout(() => {
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            text: (
              <div className="playlist-response">
                <p>Playing {matchedPlaylist.aliases[0]} now! 🎵</p>
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/videoseries?list=${matchedPlaylist.id}&autoplay=1`}
                  title="YouTube playlist player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
            ),
            sender: 'lu',
            timestamp: new Date(),
            loading: false
          };
          return newMessages;
        });
      }, 1000);
      return;
    }

    // Default response
    setTimeout(() => {
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          text: `I heard: "${input}"`,
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

  // In LuInterface.jsx
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
          <LuMessages messages={messages} interimText={interimText} />
          <LuInput
            onSend={handleSend}
            isListening={isListening}
            onVoiceToggle={() => setIsListening(!isListening)}
            inputText={inputText}
            setInputText={setInputText}
            setMessages={setMessages}  // Add this line
          />
        </>
      )}
    </div>
  );
}
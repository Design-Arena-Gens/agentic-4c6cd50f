'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
  role: 'user' | 'jarvis'
  content: string
  timestamp: Date
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [systemStatus, setSystemStatus] = useState('ONLINE')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    // Initial greeting
    setMessages([{
      role: 'jarvis',
      content: 'Good evening, sir. J.A.R.V.I.S. online and ready for your commands.',
      timestamp: new Date()
    }])

    // Update time every second
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const jarvisResponses: { [key: string]: string } = {
    'hello': 'Hello, sir. How may I assist you today?',
    'status': 'All systems operational. Power levels at optimal capacity.',
    'time': `Current time is ${time.toLocaleTimeString()}.`,
    'date': `Today is ${time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`,
    'weather': 'Weather systems indicate clear skies with optimal flying conditions.',
    'suit': 'Mark 50 armor is fully charged and ready for deployment.',
    'power': 'Arc reactor operating at 100% efficiency.',
    'scan': 'Initiating environmental scan... No threats detected in the immediate vicinity.',
    'help': 'I can assist with system status, time, date, weather updates, suit information, and general queries.',
    'protocol': 'House Party Protocol standing by. Would you like me to activate the Iron Legion?',
    'friday': 'I\'m J.A.R.V.I.S., sir. F.R.I.D.A.Y. is my successor.',
    'tony': 'Mr. Stark, I\'m here to serve.',
    'threat': 'Threat assessment complete. No hostiles detected.',
    'music': 'Playing your AC/DC playlist, sir.',
    'lights': 'Adjusting lighting to your preferred settings.',
    'security': 'All security systems armed and operational.',
    'workshop': 'Workshop environmental controls at optimal levels.',
  }

  const getJarvisResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase()

    for (const [key, response] of Object.entries(jarvisResponses)) {
      if (lowerInput.includes(key)) {
        return response
      }
    }

    // Default responses for common patterns
    if (lowerInput.includes('who are you')) {
      return 'I am J.A.R.V.I.S., Just A Rather Very Intelligent System. I was created to assist Mr. Stark.'
    }
    if (lowerInput.includes('thank')) {
      return 'You\'re welcome, sir. Always happy to assist.'
    }
    if (lowerInput.includes('ready')) {
      return 'All systems are ready and standing by for your command.'
    }

    return 'I\'m processing your request, sir. How else may I be of service?'
  }

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate processing delay
    setTimeout(() => {
      const jarvisMessage: Message = {
        role: 'jarvis',
        content: getJarvisResponse(input),
        timestamp: new Date()
      }
      setMessages(prev => [...prev, jarvisMessage])
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickCommands = [
    'Status Report',
    'System Scan',
    'Weather',
    'Suit Status',
    'Time'
  ]

  return (
    <main className="min-h-screen grid-pattern relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-jarvis-blue opacity-5 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-jarvis-blue opacity-5 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-glow mb-2">J.A.R.V.I.S.</h1>
              <p className="text-sm md:text-base opacity-70">Just A Rather Very Intelligent System</p>
            </div>
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-mono">{time.toLocaleTimeString()}</div>
              <div className="text-sm opacity-70">{time.toLocaleDateString()}</div>
            </div>
          </div>
        </header>

        {/* Status Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="border border-jarvis-blue border-glow rounded-lg p-4 bg-jarvis-panel">
            <div className="text-xs opacity-70 mb-1">SYSTEM STATUS</div>
            <div className="text-xl font-bold text-green-400">{systemStatus}</div>
          </div>
          <div className="border border-jarvis-blue border-glow rounded-lg p-4 bg-jarvis-panel">
            <div className="text-xs opacity-70 mb-1">POWER LEVEL</div>
            <div className="text-xl font-bold">100%</div>
          </div>
          <div className="border border-jarvis-blue border-glow rounded-lg p-4 bg-jarvis-panel">
            <div className="text-xs opacity-70 mb-1">SECURITY</div>
            <div className="text-xl font-bold text-green-400">ARMED</div>
          </div>
          <div className="border border-jarvis-blue border-glow rounded-lg p-4 bg-jarvis-panel">
            <div className="text-xs opacity-70 mb-1">THREATS</div>
            <div className="text-xl font-bold text-green-400">NONE</div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="grid md:grid-cols-4 gap-4">
          {/* Quick Commands */}
          <div className="md:col-span-1">
            <div className="border border-jarvis-blue border-glow rounded-lg p-4 bg-jarvis-panel">
              <h3 className="text-lg font-bold mb-4">QUICK COMMANDS</h3>
              <div className="space-y-2">
                {quickCommands.map((cmd, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(cmd)}
                    className="w-full text-left px-3 py-2 rounded bg-jarvis-blue bg-opacity-10 hover:bg-opacity-20 border border-jarvis-blue border-opacity-30 hover:border-opacity-50 transition-all text-sm"
                  >
                    {cmd}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Chat */}
          <div className="md:col-span-3">
            <div className="border border-jarvis-blue border-glow rounded-lg bg-jarvis-panel overflow-hidden flex flex-col" style={{ height: '600px' }}>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        msg.role === 'user'
                          ? 'bg-jarvis-blue bg-opacity-20 border border-jarvis-blue border-opacity-50'
                          : 'bg-jarvis-panel border border-jarvis-blue border-opacity-30'
                      }`}
                    >
                      <div className="text-xs opacity-50 mb-1">
                        {msg.role === 'user' ? 'USER' : 'J.A.R.V.I.S.'}
                      </div>
                      <div className="text-sm md:text-base">{msg.content}</div>
                      <div className="text-xs opacity-40 mt-1">
                        {msg.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-jarvis-blue border-opacity-30 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter command..."
                    className="flex-1 bg-jarvis-dark border border-jarvis-blue border-opacity-50 rounded px-4 py-3 focus:outline-none focus:border-opacity-100 focus:border-glow transition-all"
                  />
                  <button
                    onClick={handleSend}
                    className="px-6 py-3 bg-jarvis-blue bg-opacity-20 border border-jarvis-blue rounded hover:bg-opacity-30 hover:border-glow transition-all font-bold"
                  >
                    SEND
                  </button>
                  <button
                    onClick={() => setIsListening(!isListening)}
                    className={`px-6 py-3 border border-jarvis-blue rounded transition-all font-bold ${
                      isListening
                        ? 'bg-jarvis-blue bg-opacity-30 animate-glow'
                        : 'bg-jarvis-blue bg-opacity-20 hover:bg-opacity-30'
                    }`}
                  >
                    🎤
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs opacity-50">
          <p>STARK INDUSTRIES © {new Date().getFullYear()} | All Systems Operational</p>
        </footer>
      </div>
    </main>
  )
}

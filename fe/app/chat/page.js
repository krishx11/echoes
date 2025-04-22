"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Home, Upload, MessageSquare, Send, Play, Pause } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function ChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentAudio, setCurrentAudio] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const messagesEndRef = useRef(null)
  const audioRef = useRef(null)
  const { toast } = useToast()

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response from server")
      }

      const data = await response.json()

      const botMessage = {
        id: Date.now() + 1,
        text: data.text,
        sender: "bot",
        audioUrl: data.audio_url,
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to communicate with the server. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlayAudio = (audioUrl) => {
    if (currentAudio === audioUrl && isPlaying) {
      // Pause current audio
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      // Play new audio or resume current
      if (currentAudio !== audioUrl) {
        setCurrentAudio(audioUrl)
        if (audioRef.current) {
          audioRef.current.src = audioUrl
        }
      }
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">VoiceChat AI</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="font-medium">
                  <Home className="inline-block mr-1" size={18} />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/upload" className="font-medium">
                  <Upload className="inline-block mr-1" size={18} />
                  Upload
                </Link>
              </li>
              <li>
                <Link href="/chat" className="font-medium">
                  <MessageSquare className="inline-block mr-1" size={18} />
                  Chat
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6 px-4 flex flex-col">
        <h1 className="text-3xl font-bold mb-6 text-center">Chat with AI</h1>

        <Card className="flex-1 flex flex-col max-w-3xl mx-auto w-full">
          <CardContent className="flex-1 flex flex-col p-4">
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {messages.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                    <p>Start a conversation with the AI</p>
                  </div>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <p>{message.text}</p>
                      {message.audioUrl && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 h-8 px-2"
                          onClick={() => handlePlayAudio(message.audioUrl)}
                        >
                          {currentAudio === message.audioUrl && isPlaying ? (
                            <Pause size={16} className="mr-2" />
                          ) : (
                            <Play size={16} className="mr-2" />
                          )}
                          {currentAudio === message.audioUrl && isPlaying ? "Pause Audio" : "Play Audio"}
                        </Button>
                      )}
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading || !input.trim()}>
                {isLoading ? "Sending..." : <Send size={18} />}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Hidden audio element for playing response audio */}
        <audio ref={audioRef} onEnded={handleAudioEnded} className="hidden" />
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          
        </div>
      </footer>
    </div>
  )
}

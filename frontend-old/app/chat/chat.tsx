"use client"

import { useState, useEffect, useRef } from "react"
import { Message } from "../.next/types"
import { Bot, Loader2, Mic, SendHorizonal, Volume2 } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ChatPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      isPlaying: false,
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsProcessing(true)

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      })

      const data = await res.json()

      const echoMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "echo",
        audioUrl: "http://localhost:5000" + data.audio_url,
        isPlaying: false,
      }

      setMessages(prev => [...prev, echoMessage])
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePlayAudio = (msgId: string, audioUrl?: string) => {
    if (!audioUrl) return

    // Pause any other playing audios
    setMessages(prev =>
      prev.map(msg =>
        msg.id === msgId
          ? { ...msg, isPlaying: true }
          : { ...msg, isPlaying: false }
      )
    )

    if (audioRef.current) {
      audioRef.current.pause()
    }

    const audio = new Audio(audioUrl)
    audioRef.current = audio
    audio.play()

    audio.onended = () => {
      setMessages(prev =>
        prev.map(msg =>
          msg.id === msgId ? { ...msg, isPlaying: false } : msg
        )
      )
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend()
  }

  return (
    <main className="flex flex-col items-center justify-between min-h-screen py-8">
      <div className="flex flex-col w-full max-w-xl px-4">
        <div className="text-3xl font-semibold mb-6">🗣️ Echoes Chat</div>

        <div className="flex-1 overflow-y-auto mb-6 space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={cn(
                "p-3 rounded-xl shadow-sm max-w-sm text-sm",
                msg.sender === "user"
                  ? "self-end bg-blue-500 text-white"
                  : "self-start bg-gray-100"
              )}
            >
              <div className="flex items-center gap-2 justify-between">
                <div>{msg.content}</div>
                {msg.audioUrl && (
                  <button onClick={() => handlePlayAudio(msg.id, msg.audioUrl)}>
                    <Volume2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <input
            className="flex-1 px-4 py-2 border rounded-lg text-sm"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSend}
            disabled={isProcessing}
            className={cn(
              "p-2 rounded-md",
              isProcessing ? "opacity-50" : "hover:bg-gray-200"
            )}
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <SendHorizonal className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </main>
  )
}

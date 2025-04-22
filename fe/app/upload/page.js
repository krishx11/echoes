"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Play, Pause, Home, MessageSquare } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const audioRef = useRef(null)
  const fileInputRef = useRef(null)
  const { toast } = useToast()

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith("audio/")) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setAudioUrl(url)
    } else if (file) {
      toast({
        title: "Invalid file type",
        description: "Please select an audio file.",
        variant: "destructive",
      })
    }
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an audio file to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("voice", selectedFile)

      const response = await fetch("http://localhost:5000/upload_voice", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        toast({
          title: "Upload successful",
          description: "Your audio file has been uploaded successfully.",
        })

        // Reset the form
        setSelectedFile(null)
        setAudioUrl(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ""
        }
      } else {
        throw new Error("Upload failed")
      }
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your audio file. Please try again.",
        variant: "destructive",
      })
      console.error("Error uploading file:", error)
    } finally {
      setIsUploading(false)
    }
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

      <main className="flex-1 container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Upload Audio</h1>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Upload an Audio File</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">Click to select an audio file or drag and drop</p>
                  <p className="text-xs text-gray-500 mt-1">Supported formats: MP3, WAV, OGG, etc.</p>
                </div>
                <input type="file" accept="audio/*" className="hidden" onChange={handleFileChange} ref={fileInputRef} />
              </div>

              {audioUrl && (
                <div className="mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 truncate">
                      <p className="text-sm font-medium truncate">{selectedFile?.name}</p>
                      <p className="text-xs text-gray-500">{(selectedFile?.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                    <Button type="button" variant="ghost" size="icon" onClick={handlePlayPause} className="ml-2">
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </Button>
                    <audio ref={audioRef} src={audioUrl} onEnded={handleAudioEnded} className="hidden" />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={!selectedFile || isUploading}>
                {isUploading ? "Uploading..." : "Submit"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">After uploading, you can chat with our AI about your audio.</p>
          </CardFooter>
        </Card>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
          
        </div>
      </footer>
    </div>
  )
}

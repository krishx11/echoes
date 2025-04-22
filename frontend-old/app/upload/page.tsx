"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function VoiceUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const router = useRouter()

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a voice file first.")
      return
    }

    const formData = new FormData()
    formData.append("voice", file)

    setUploading(true)
    try {
      const res = await fetch("http://localhost:5000/upload_voice", {
        method: "POST",
        body: formData,
      })

      if (res.ok) {
        router.push("/chat")
      } else {
        alert("Upload failed. Try again.")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Something went wrong.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-3xl font-semibold mb-6">🎙️ Upload Your Voice Sample</h1>

      <input
        type="file"
        accept="audio/*"
        onChange={e => setFile(e.target.files?.[0] || null)}
        className="mb-4"
      />

      <button
        disabled={uploading}
        onClick={handleUpload}
        className="bg-blue-600 text-white px-6 py-2 rounded-md disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Start Chat"}
      </button>
    </main>
  )
}

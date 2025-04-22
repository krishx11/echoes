import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, Upload } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Echoes</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="font-medium">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/upload" className="font-medium">
                  Upload
                </Link>
              </li>
              <li>
                <Link href="/chat" className="font-medium">
                  Chat
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Welcome to Echoes - A Cobersation that Stays</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
              Upload a voice snipet of a loved one an continue your conversations through a theraputic chatbot
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/chat">
                <Button size="lg" className="gap-2">
                  Start Chatting <MessageSquare size={18} />
                </Button>
              </Link>
              <Link href="/upload">
                <Button size="lg" variant="outline" className="gap-2">
                  Upload Audio <Upload size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Upload className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Audio</h3>
              <p className="text-gray-600">
                Record or upload your audio files to get started. Our system will process your audio input.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MessageSquare className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Chat with AI</h3>
              <p className="text-gray-600">Engage in natural conversations with our AI through text messages.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ArrowRight className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Voice Responses</h3>
              <p className="text-gray-600">
                Receive both text and voice responses from our AI for a more immersive experience.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-600">
         
        </div>
      </footer>
    </div>
  )
}

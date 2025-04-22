"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#FAF9F8] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">Echoes – Conversations That Stay</h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Upload a voice snippet of a loved one and continue your conversations through our therapeutic AI chatbot.
        </p>
        <Link href="/upload" passHref>
          <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
            Start Conversation
          </Button>
        </Link>
      </motion.div>
    </main>
  )
}

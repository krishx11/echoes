"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#FAF9F8] text-center">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">This page echoes silence.</h1>
        <p className="text-xl text-gray-600 mb-10">The conversation you're looking for seems to have faded away.</p>
        <Link href="/" passHref>
          <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg">
            Let's go back
          </Button>
        </Link>
      </motion.div>
    </main>
  )
}

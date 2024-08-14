import Home from '@/components/Home'
import React from 'react'

const page = async () => {
  const res = await fetch('http://localhost:8000/api/conversations', { cache: "no-store" });

  const conversations = await res.json();

  return (
    <Home conversations={conversations} />
  )
}

export default page
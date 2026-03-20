import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Apply from './pages/Apply'
import Results from './pages/Results'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col items-center">
        <Navbar />
        <main className="flex-grow w-full pt-20">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App

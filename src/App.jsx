import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import { ThemeProvider } from './context/ThemeContext'

const App = () => {
  return (
    <>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
    </>
  )
}

export default App
import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ColorPicker from './components/ColorPicker'
import Features from './components/Features'
import HowToUse from './components/HowToUse'
import ColorFormats from './components/ColorFormats'
import About from './components/About'
import FAQ from './components/FAQ'
import './App.css'

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <ColorPicker />
        <Features />
        <HowToUse />
        <ColorFormats />
        <About />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

export default App


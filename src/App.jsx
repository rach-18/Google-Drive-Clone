import { useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Data from './components/Data'
import './App.css'
// import '@geist-ui/core/dist/'

function App() {
  return (
    <>
      <Header />
      <div className="app flex">
        <Sidebar />
        <Data />
      </div>
    </>
  )
}

export default App

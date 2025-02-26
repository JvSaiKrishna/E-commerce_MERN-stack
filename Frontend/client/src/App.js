import React from 'react'
import "./App.css"
import Landingpage from './component/Landingpage'
import {BrowserRouter} from "react-router-dom"

const App = () => {
  return (
    <BrowserRouter>
    <div><Landingpage/></div>
    </BrowserRouter>
  )
}

export default App
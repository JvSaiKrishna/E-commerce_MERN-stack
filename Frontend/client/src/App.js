import React from 'react'
import "./App.css"
import Landingpage from './component/Landingpage'
import {BrowserRouter} from "react-router-dom"
import { Provider } from 'react-redux'
import {store} from "./component/Shopping/Store/store.js"

const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <div><Landingpage/></div>
    </BrowserRouter>
    </Provider>
  )
}

export default App
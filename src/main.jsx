import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from 'react-hot-toast';
import App from './App.jsx'
import { store } from './store'
import { Provider } from 'react-redux'
import { Routes } from "react-router"
import { ThemeProvider } from "./Theme";


createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      <Toaster />
    </Provider>,
 
)

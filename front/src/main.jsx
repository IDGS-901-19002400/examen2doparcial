import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ReloadPrompt from './ReloadPrompt'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <ReloadPrompt />

    <App />
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { DataContextProvider } from './context/DataContex'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DataContextProvider>
      <App />
    </DataContextProvider>
  </React.StrictMode>,
)

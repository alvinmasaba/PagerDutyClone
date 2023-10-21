import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className="bg-[#008c3115] absolute top-[-6rem] 
      -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full 
      blur-[10rem] sm:w-[68.75rem]">
    </div>
    <div className="bg-[#dbd7fb6c] absolute top-[-1rem] 
      -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full 
      blur-[10rem] sm:w-[68.75rem] md:left-[-33rem]
      lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]">
    </div>
    <App />
  </React.StrictMode>,
)

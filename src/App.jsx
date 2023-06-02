import { useState } from 'react'
import ConnectForm from './pages/Connection'
import Loading from './components/Loading'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Loading/>
      {/* <ConnectForm/> */}
    </>
  )
}

export default App

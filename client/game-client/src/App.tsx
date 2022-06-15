import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>le nice app</h1>
      <h2>le nice count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>le nice button</button>
    </>
  )
}

export default App

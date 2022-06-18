import { useContext, useState, useMemo, useEffect } from 'react';
import Canvas from './components/Canvas';
import { EmscriptenModule } from './EmscriptenTypes';
import PlayerScript from './components/PlayerScript';
import { ScriptComponent } from './Script';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>le nice app</h1>
      <h2>le nice count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>le nice button</button>
      <Canvas>
        {/* <ScriptComponent<PlayerScript> buildFn={PlayerScript.Build} /> */}
      </Canvas>
    </>
  )
}

export default App;

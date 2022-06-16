import { useContext, useState, useMemo } from 'react';
import { EmscriptenModule } from './EmscriptenTypes';
import { EngineContext, FunctionBindings, CEntity } from './EngineContext';

function App() {
  const [count, setCount] = useState(0);
  const engine = useContext(EngineContext);
  const [audio, setAudio] = useState<CEntity | null>(null);

  if (!engine) return <></>;

  // componentDidMount
  useMemo(() => {
    setAudio(new engine.CEntity());
    console.log('initialized entity!', audio);
    
    // cleanup
    return () => {
      console.log('uninitialized entity!', audio);
      if (audio) engine.destroy(audio);
    }
  }, []);

  return (
    <>
      <h1>le nice app</h1>
      <h2>le nice count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>le nice button</button>
      <h2>le nice audio: {audio?.ID}</h2>
    </>
  )
}

export default App;

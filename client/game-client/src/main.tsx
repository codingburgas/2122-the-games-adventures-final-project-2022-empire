import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import createModule from './engine.js';
import { EngineContext, EngineModule } from './EngineContext';

createModule().then((module: EngineModule | null) => {
  if (module) console.log('wasm initialized!');
  else console.log('wasm could not be initialized!');

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <EngineContext.Provider value={module}>
      <App />
    </EngineContext.Provider>
  )
});


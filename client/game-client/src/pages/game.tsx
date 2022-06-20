import {useState } from "react";
import Canvas from "../components/Canvas";
import { EmscriptenModule } from "../EmscriptenTypes";
import PlayerScript from "../components/PlayerScript";
import { ScriptComponent } from "../Script";
import { CCamera2D, Engine } from "../Engine";

function Game() {
  const [canvasOn, setCanvasOn] = useState(false);

  return (
    <>
      <h1>le nice app</h1>
      <button onClick={() => setCanvasOn(!canvasOn)}>toggle le canvas</button>
      {canvasOn ? (
        <Canvas>
          <ScriptComponent<PlayerScript> buildFn={PlayerScript.Build} />
        </Canvas>
      ) : null}
    </>
  );
}

export default Game;

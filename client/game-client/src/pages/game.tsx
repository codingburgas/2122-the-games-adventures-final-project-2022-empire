import {useState } from "react";
import Canvas from "../components/Canvas";
import { EmscriptenModule } from "../EmscriptenTypes";
import PlayerScript from "../components/PlayerScript";
import { ScriptComponent } from "../Script";
import { CCamera2D, Engine } from "../Engine";
import { 
  MenuArt, PlayButton
} from './gameStyles'

function Game() {
  const [canvasOn, setCanvasOn] = useState(false);

  return (
    <>
      {canvasOn ? (
        <Canvas>
          <ScriptComponent<PlayerScript> buildFn={PlayerScript.Build} />
        </Canvas>
      ) : (
        <MenuArt onClick={() => setCanvasOn(!canvasOn)}>
          <PlayButton>Click to Play</PlayButton>
        </MenuArt>
      )}
    </>
  );
}

export default Game;

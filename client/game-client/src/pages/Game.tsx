import { useState } from "react";
import Canvas from "../components/Canvas";
import PlayerScript from "../components/PlayerScript";
import { ScriptComponent } from "../Script";
import {
  MenuArt, PlayButton
} from '../components/gameStyles'

function Game() {
  const [canvasOn, setCanvasOn] = useState(false);

  return (
    <>
      {canvasOn ? (
        <Canvas>
          <ScriptComponent<PlayerScript> type={PlayerScript} />
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

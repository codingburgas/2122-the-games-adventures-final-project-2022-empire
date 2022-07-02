import { createContext, useEffect, useState } from "react";
import Canvas from "../components/Canvas";
import PlayerScript from "../components/PlayerScript";
import { ScriptComponent } from "../Script";
import {
  MenuArt,
  PlayButton,
  Monitor,
  InventoryBackground,
  InventorySlot,
} from "../components/gameStyles";
import { Room, RoomMetadata, RoomPickable } from "../Room";
import roomTest_pickableData from "../../assets/rooms/room_test/inv.json";
import roomTest_collisionData from "../../assets/rooms/room_test/col.csv?raw";
import roomTest_metadata from "../../assets/rooms/room_test/md.json";
import inventory from "../../assets/inventory.svg?url";
import badge from "../../assets/badge.png";

const GameContext = createContext(null as unknown as React.Dispatch<React.SetStateAction<boolean>>)

function Game() {
  const [isPickedUp, setIsPickedUp] = useState(false);
  const [canvasOn, setCanvasOn] = useState(false);

  return (
    <>
      {canvasOn ? (
        <Monitor>
          <GameContext.Provider value={setIsPickedUp}>
            <Canvas>
              <Room
                metadata={roomTest_metadata as RoomMetadata}
                pickableData={roomTest_pickableData as RoomPickable[]}
                collisionData={roomTest_collisionData}
              >
                <ScriptComponent<PlayerScript> type={PlayerScript} />
              </Room>
            </Canvas>
          </GameContext.Provider>
          
          <InventoryBackground src={inventory} />
          {isPickedUp ? <InventorySlot src={badge} id="slot" /> : null}
          
        </Monitor>
      ) : (
        <MenuArt onClick={() => setCanvasOn(!canvasOn)}>
          <PlayButton>Click to Play</PlayButton>
        </MenuArt>
      )}
    </>
  );
}

export {Game as default, GameContext};

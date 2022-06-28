import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { BackgroundRenderer } from "./components/BackgroundRenderer";
import { CameraContext, EngineContext, RoomRefContext } from "./components/Canvas";
import { ForegroundRenderer } from "./components/ForegroundRenderer";
import { CCamera2D, CRenderTexture, CTexture, Engine, EngineModule, Rectangle, Vector2 } from "./Engine";
import { GameContext } from "./pages/Game";
import { ScriptComponent } from "./Script";

const parseFunctionMap = (csvText: string): number[][] => {
    return csvText.split('\n').map(line => line.split(',').map(Number));
}

export interface RoomMetadata {
    name: string;
    startingPos: Vector2;
    tileSize: number;
    scaleFactor: number;
}

export interface RoomPickable {
    id: number;
    name: string;
    res: string;
    pos: Vector2;
    tex: CTexture;
    show: boolean;
};

export class CRoom {
    private engine: EngineModule;

    private bgTex: CTexture;
    private fgTex: CTexture;
    private functionMap: number[][] = [];
    private metadata: RoomMetadata = {} as RoomMetadata;
    private pickables: RoomPickable[] = [];
    private gameContext: any;

    public constructor(engine: EngineModule) {
        this.engine = engine;
        this.bgTex = new this.engine.CTexture();
        this.fgTex = new this.engine.CTexture();
    }

    public updateBGTexture(res: string) {
        this.bgTex.Unload();
        this.bgTex.Load(`res/rooms/room_test/${res}`);
    }

    loadMap(collisionData: string, pickableData: RoomPickable[], gameContext: React.Dispatch<React.SetStateAction<boolean>>, metadata: RoomMetadata) {
        console.log(collisionData, pickableData);
        this.fgTex.Unload();
        this.fgTex.Load(`res/rooms/${metadata.name}/fg.png`);
        this.bgTex.Unload();
        this.bgTex.Load(`res/rooms/${metadata.name}/bg.png`);
        this.functionMap = parseFunctionMap(collisionData);
        this.metadata = metadata;
        this.pickables = pickableData;

        //Load the textures for picables
        for (let pickable of this.pickables) {
            pickable.tex = new this.engine.CTexture();
            pickable.tex.Unload();
            pickable.tex.Load(pickable.res);
        }

        this.gameContext = gameContext; 
    }

    getPositionFunction(rect: Rectangle): number {
        return this.functionMap[Math.floor(rect.x / this.metadata.tileSize)][Math.floor(rect.y / this.metadata.tileSize)] ||
            this.functionMap[Math.floor(rect.x + rect.width / this.metadata.tileSize)][Math.floor(rect.y + rect.height / this.metadata.tileSize)]; 
    }

    //Measure distance between two vector2
    Distance(a: Vector2, b: Vector2): number {
        return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
    }

    GetEntityAt(pos: Vector2): RoomPickable | undefined {
        // Search in a search radius of 1 tile
        for (let pickable of this.pickables) {
            if (this.Distance(pos, pickable.pos) < this.metadata.tileSize * 3 && pickable.show) {
                if (pickable.id == 1) {
                    this.gameContext(true);
                }

                return pickable;
            }
        }
    }

    GetEntityWithId(id: number): RoomPickable | undefined {
        for (let pickable of this.pickables) {
            if (pickable.id === id) {
                return pickable;
            }
        }
    }

    renderBG() {
        this.engine.DrawTexture(this.bgTex.Texture, 0, 0, { r: 255, g: 255, b: 255, a: 255 });
        for (let pickable of this.pickables) {
            if (pickable.show) {
                this.engine.DrawTexturePro(
                    pickable.tex.Texture,
                    {x: 0, y: 0 , width: pickable.tex.Texture.width, height: pickable.tex.Texture.height},
                    {x: pickable.pos.x, y: pickable.pos.y, width: pickable.tex.Texture.width / 2, height: pickable.tex.Texture.height / 2},
                    { x: 64 * 1.5 / 2, y: 64 * 1.5 / 2 },
                    0, { r: 255, g: 255, b: 255, a: 255 }
                    );
            }

        }
    }

    renderFG() {
        this.engine.DrawTexture(this.fgTex.Texture, 0, 0, { r: 255, g: 255, b: 255, a: 255 });
    }

    dispose() {
        this.bgTex.delete();
        this.fgTex.delete();
    }
}

export function Room({ collisionData, pickableData, metadata, children }: { collisionData: string; pickableData: RoomPickable[]; metadata: RoomMetadata; children: React.ReactNode }) {
    const engineContext = useContext(EngineContext);
    const roomRefContext = useContext(RoomRefContext);
    const cameraContext = useContext(CameraContext);
    const gameContext = useContext(GameContext);
    
    useEffect(() => {
        roomRefContext.current = new CRoom(engineContext);
        roomRefContext.current.loadMap(collisionData, pickableData, gameContext, metadata);

        return () => {
            if (!roomRefContext.current) return
            roomRefContext.current?.dispose();
            roomRefContext.current = undefined;
        }
    })

    return <>
        <ScriptComponent<BackgroundRenderer> type={BackgroundRenderer} />
        {children}
        <ScriptComponent<ForegroundRenderer> type={ForegroundRenderer} />
    </>;
}
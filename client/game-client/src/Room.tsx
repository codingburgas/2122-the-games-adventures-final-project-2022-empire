import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { BackgroundRenderer } from "./components/BackgroundRenderer";
import { CameraContext, EngineContext, RoomRefContext } from "./components/Canvas";
import { ForegroundRenderer } from "./components/ForegroundRenderer";
import { CCamera2D, CRenderTexture, CTexture, Engine, EngineModule, Rectangle, Vector2 } from "./Engine";
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
};

export class CRoom {
    private engine: EngineModule;

    private bgTex: CTexture;
    private fgTex: CTexture;
    private functionMap: number[][] = [];
    private metadata: RoomMetadata = {} as RoomMetadata;
    private pickables: RoomPickable[] = [];

    public constructor(engine: EngineModule) {
        this.engine = engine;
        this.bgTex = new this.engine.CTexture();
        this.fgTex = new this.engine.CTexture();
    }

    loadMap(collisionData: string, pickableData: RoomPickable[], metadata: RoomMetadata) {
        console.log(collisionData, pickableData);
        this.fgTex.Unload();
        this.fgTex.Load(`res/rooms/${metadata.name}/fg.png`);
        this.bgTex.Unload();
        this.bgTex.Load(`res/rooms/${metadata.name}/bg.png`);
        this.functionMap = parseFunctionMap(collisionData);
        this.metadata = metadata;
        this.pickables = pickableData;
    }

    getPositionFunction(rect: Rectangle): number {
        return this.functionMap[Math.floor(rect.x / this.metadata.tileSize)][Math.floor(rect.y / this.metadata.tileSize)] ||
            this.functionMap[Math.floor(rect.x + rect.width / this.metadata.tileSize)][Math.floor(rect.y + rect.height / this.metadata.tileSize)]; 
    }
    
    renderBG() {
        this.engine.DrawTexture(this.bgTex.Texture, 0, 0, { r: 255, g: 255, b: 255, a: 255 });
    }

    renderFG() {
        this.engine.DrawTexture(this.fgTex.Texture, 0, 0, { r: 255, g: 255, b: 255, a: 255 });
    }

    dispose() {
        this.bgTex.delete();
        this.fgTex.delete();
    }

    get 
}

export function Room({ collisionData, pickableData, metadata, children }: { collisionData: string; pickableData: RoomPickable[]; metadata: RoomMetadata; children: React.ReactNode }) {
    const engineContext = useContext(EngineContext);
    const roomRefContext = useContext(RoomRefContext);
    const cameraContext = useContext(CameraContext);

    useEffect(() => {
        roomRefContext.current = new CRoom(engineContext);
        roomRefContext.current.loadMap(collisionData, pickableData, metadata);

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
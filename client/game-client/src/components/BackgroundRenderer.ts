import React from "react";
import { CCamera2D, EngineModule } from "../Engine";
import Module from "../engine_wasm";
import { CRoom } from "../Room";
import { Script } from "../Script";

export class BackgroundRenderer extends Script {
    private roomRef: React.MutableRefObject<CRoom | undefined>;
    
    public constructor(engine: EngineModule, camera: CCamera2D, roomRef: React.MutableRefObject<CRoom | undefined>) {
        super(engine, camera);

        this.roomRef = roomRef;

        this.OnCreate();
        this.attachedComponent.BindFunction("OnUpdate", () => this.OnUpdate());
    }
    
    public OnCreate(): void {};
    
    public OnUpdate(): void {
        if (this.camera) {
            this.camera.DrawWithCamera(() => {
                if (this.roomRef.current) {
                    this.roomRef.current.renderBG();
                }
            });
        }
    }

    public OnDestroy(): void {};
}
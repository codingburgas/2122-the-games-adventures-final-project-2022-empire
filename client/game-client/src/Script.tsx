import React, { useContext, useEffect, useRef, useState } from "react";
import { CameraContext } from "./components/Canvas";
import { Camera2D, CCamera2D, CComponent, CEntity, Engine, EngineModule } from "./Engine";

export abstract class Script {
    protected engine: EngineModule;
    protected entity: CEntity;
    protected attachedComponent: CComponent;
    protected camera: CCamera2D | null | undefined;

    protected constructor(engine: EngineModule, camera?: CCamera2D) {
        this.engine = engine;

        let entity = new engine.CEntity();
        let attachedComponent = new engine.CComponent();

        this.entity = entity;
        this.attachedComponent = attachedComponent;

        this.entity.AddComponent(this.attachedComponent);

        if (camera) this.camera = camera;
    }

    public abstract OnCreate(): void;
    public abstract OnUpdate(): void;
    public abstract OnDestroy(): void;

    public _internalOnDestroy() {
        this.OnDestroy();
        this.entity.delete();
        this.attachedComponent.delete();
    }

    get Entity() {
        return this.entity;
    }

    get Component() {
        return this.attachedComponent;
    }
}

export function ScriptComponent<T extends Script>(props: { buildFn: (camera?: CCamera2D) => Promise<T> }) {
    const camContext = useContext(CameraContext);
    const scriptRef = useRef<T>();

    useEffect(() => {
        (async () => {
            scriptRef.current = await props.buildFn(camContext);
        })();

        return () => {
            scriptRef.current?._internalOnDestroy();
        };
    }, []);

    return <></>;
}
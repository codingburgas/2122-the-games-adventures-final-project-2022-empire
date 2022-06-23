import { useContext, useEffect, useRef } from "react";
import { CameraContext, EngineContext, RoomRefContext } from "./components/Canvas";
import { CCamera2D, CComponent, CEntity, EngineModule } from "./Engine";
import { CRoom } from "./Room";

export abstract class Script {
    protected engine: EngineModule;
    protected entity: CEntity;
    protected attachedComponent: CComponent;
    protected camera: CCamera2D;

    public constructor(engine: EngineModule, camera: CCamera2D) {
        this.engine = engine;

        let entity = new engine.CEntity();
        let attachedComponent = new engine.CComponent();

        this.entity = entity;
        this.attachedComponent = attachedComponent;

        this.entity.AddComponent(this.attachedComponent);

        this.camera = camera;
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

export function ScriptComponent<T extends Script>(props: { type: { new (engine: EngineModule, camera: CCamera2D, roomRef: React.MutableRefObject<CRoom | undefined>): T } }) {
    const camContext = useContext(CameraContext);
    const engineContext = useContext(EngineContext);
    const roomRef = useContext(RoomRefContext);
    const scriptRef = useRef<T>();

    useEffect(() => {
        (() => {
            scriptRef.current = new props.type(engineContext, camContext, roomRef);
        })();

        return () => {
            scriptRef.current?._internalOnDestroy();
        };
    }, []);

    return <></>;
}
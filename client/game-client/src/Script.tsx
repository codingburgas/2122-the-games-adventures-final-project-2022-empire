import React from "react";
import { CComponent, CEntity, Engine, EngineModule } from "./Engine";

export abstract class Script {
    protected engine: EngineModule;
    protected entity: CEntity;
    protected attachedComponent: CComponent;

    protected constructor(engine: EngineModule) {
        this.engine = engine;

        let entity = new engine.CEntity();
        let attachedComponent = new engine.CComponent();

        this.entity = entity;
        this.attachedComponent = attachedComponent;

        this.entity.AddComponent(this.attachedComponent);
    }

    public abstract OnCreate(): void;
    public abstract OnUpdate(): void;
    public abstract OnDestroy(): void;

    get Entity() {
        return this.entity;
    }

    get Component() {
        return this.attachedComponent;
    }
}

export class ScriptComponent<T extends Script> extends React.Component<{buildFn: () => Promise<T>}, T> {
    async componentDidMount() {
        this.state = await this.props.buildFn();
    }

    render () {
        return <></>;
    }
}
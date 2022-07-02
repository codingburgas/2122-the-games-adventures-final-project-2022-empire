import { useState, useContext, useEffect } from "react";
import { Vector2 } from "../Engine";

export function Player() {
    // const engine = useContext(EngineContext);

    // if (!engine) return <></>;

    // const [scr, setScr] = useState

    // componentDidMount
    // useEffect(() => {
    //     let ent = new engine.CEntity();
    //     let comp = new engine.CComponent();
    //     let tex = new engine.CTexture();

    //     ent.AddComponent(comp);

    //     let pos: Vector2 = { x: 0, y: 0 };

    //     comp.BindFunction("OnCreate", () => {
    //         tex.Load('res/dog.png');
    //     });

    //     comp.BindFunction("OnUpdate", () => {
    //         if (engine.IsKeyDown(87)) {
    //             pos.y -= engine.GetFrameTime() * 200;
    //         } if (engine.IsKeyDown(83)) {
    //             pos.y += engine.GetFrameTime() * 200;
    //         } if (engine.IsKeyDown(65)) {
    //             pos.x -= engine.GetFrameTime() * 200;
    //         } if (engine.IsKeyDown(68)) {
    //             pos.x += engine.GetFrameTime() * 200;
    //         }

    //         engine.DrawTexture(tex.Texture, pos.x, pos.y, { r: 255, g: 255, b: 255, a: 255 });
    //     });

    //     setEnt(ent);
    //     setComp(comp);

    //     // cleanup
    //     return () => {
    //         if (ent) ent.delete();
    //         if (comp) comp.delete();
    //     }
    // }, []);

    return <></>;
}
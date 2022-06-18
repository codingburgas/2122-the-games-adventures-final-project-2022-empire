import { useContext, useEffect, useState } from "react";
import { Engine, EngineModule } from "../Engine";

export default function Canvas({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const [engine, setEngine] = useState<EngineModule>();
    const [tickInterval, setTickInterval] = useState<number>();

    useEffect(() => {
        Engine.Instance()
            .then(engine => {
                console.log(engine);
                setLoading(false);
                setEngine(engine);
            })
            .catch(error => setError(error.message));
    }, []);
        
    useEffect(() => {
        if (engine) {
            engine.Init();
            
            if (tickInterval) clearInterval(tickInterval);
            setTickInterval(setInterval(() => engine.Tick(), 1000 / 60));
        }

        return () => {
            engine?.Deinit();
            clearInterval(tickInterval);
        };
    }, [engine]);
    
    if (loading)
        return <div>Engine is loading...</div>;
    else if (engine) return <>
        {children}
        <canvas id="canvas" ref={canvas => {
            if (canvas) {
                engine.canvas = canvas;
            }
        }} />
    </>;
    else return <div>Engine failed to load: {error}</div>;
}
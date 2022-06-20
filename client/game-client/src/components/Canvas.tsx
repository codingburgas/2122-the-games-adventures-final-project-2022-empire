import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CCamera2D, Engine, EngineModule } from "../Engine";

export const CameraContext = createContext<CCamera2D>({} as CCamera2D);

export default function Canvas({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const engineRef = useRef<EngineModule>();
    const cameraRef = useRef<CCamera2D>();
    const tickIntervalRef = useRef<number>();

    useEffect(() => {
        (async () => {
            Engine.Instance()
                .then(engine => {
                    engineRef.current = engine;
                    let camera = new engineRef.current.CCamera2D();
                    camera.Camera = {
                        offset: { x: 0, y: 0 },
                        target: { x: 0, y: 0 },
                        zoom: 1,
                        rotation: 0
                    };
                
                    cameraRef.current = camera;
                    setLoading(false);
                })
                .catch(error => setError(error.message));
        })();
        
        return () => {
            engineRef.current?.Deinit();
            engineRef.current?.DeinitComponents();
            engineRef.current = undefined;
            cameraRef.current?.delete();
            cameraRef.current = undefined;
            if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
        };
    }, []);

    useEffect(() => {
        if (tickIntervalRef.current) clearInterval(tickIntervalRef.current);
        if (!engineRef.current) return;
        
        engineRef.current.Init();
       
        tickIntervalRef.current = setInterval(() => engineRef.current?.Tick(), 1000 / 60);
    }, [loading]);
    
    if (loading)
        return <div>Engine is loading...</div>;
    else if (engineRef.current) return <>
        {cameraRef.current ? <CameraContext.Provider value={cameraRef.current}>
            {children}
        </CameraContext.Provider> : <></>}
        <canvas id="canvas" ref={canvas => {
            if (canvas && engineRef.current) {
                engineRef.current.canvas = canvas;
            }
        }} />
    </>;
    else return <div>Engine failed to load: {error}</div>;
}
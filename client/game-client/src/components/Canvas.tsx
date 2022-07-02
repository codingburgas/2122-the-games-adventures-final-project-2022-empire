import { createContext, useContext, useEffect, useRef, useState } from "react";
import { CCamera2D, Engine, EngineModule } from "../Engine";
import { CRoom } from "../Room";

export const CameraContext = createContext<CCamera2D>({} as CCamera2D);
export const EngineContext = createContext<EngineModule>({} as EngineModule);
export const RoomRefContext = createContext<React.MutableRefObject<CRoom | undefined>>({} as React.MutableRefObject<CRoom | undefined>);

export default function Canvas({ children }: { children: React.ReactNode }) {
    const [engineLoading, setEngineLoading] = useState<boolean>(true);
    const [raylibLoading, setRaylibLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>();
    const engineRef = useRef<EngineModule>();
    const cameraRef = useRef<CCamera2D>();
    const roomRef = useRef<CRoom>();
    
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
                    setEngineLoading(false);
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
        setRaylibLoading(false);
    }, [engineLoading]);
    
    if (engineLoading)
        return <div>Engine is loading...</div>;
    else if (raylibLoading)
        return <canvas id="canvas" ref={canvas => {
            if (canvas && engineRef.current) {
                engineRef.current.canvas = canvas;
            }
        }} />
    else if (engineRef.current && cameraRef.current) return <>
        <canvas id="canvas" ref={canvas => {
            if (canvas && engineRef.current) {
                engineRef.current.canvas = canvas;
            }
        }} /> 
        <EngineContext.Provider value={engineRef.current}>
            <CameraContext.Provider value={cameraRef.current}>
                <RoomRefContext.Provider value={roomRef}>
                    {children}
                </RoomRefContext.Provider>
            </CameraContext.Provider>
        </EngineContext.Provider>
    </>;
    else return <div>Engine failed to load: {error}</div>;
}
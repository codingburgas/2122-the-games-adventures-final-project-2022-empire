import { Script } from '../Script';
import { CCamera2D, CComponent, CEntity, CTexture, Engine, EngineModule, Vector2 } from '../Engine';


const lerp = (x: number, y: number, t: number) => x * (1 - t) + y * t;

export default class PlayerScript extends Script {
    private pos: Vector2 = { x: 0, y: 0 };
    private tex: CTexture | null | undefined;
    
    public constructor(engine: EngineModule, camera: CCamera2D) {
        super(engine, camera);

        this.OnCreate();
        this.attachedComponent.BindFunction("OnUpdate", () => this.OnUpdate());
    }
    
    public OnCreate(): void {
        let texture = new this.engine.CTexture();
        texture.Load('res/sprites/player/idle/player-idle-1.png');
        this.tex = texture;
    }
    
    public OnUpdate(): void {
        // up down left right handle with keycodes
        if (this.engine.IsKeyDown(87))
            this.pos.y -= 200 * this.engine.GetFrameTime();
        if (this.engine.IsKeyDown(83))
            this.pos.y += 200 * this.engine.GetFrameTime();
        if (this.engine.IsKeyDown(65))
            this.pos.x -= 200 * this.engine.GetFrameTime();
        if (this.engine.IsKeyDown(68))
            this.pos.x += 200 * this.engine.GetFrameTime();
        
        if (this.camera) {
            let cam = this.camera.Camera;
            this.camera.Camera = {
                offset: { x: this.engine.GetScreenWidth() / 2, y: this.engine.GetScreenHeight() / 2 },
                target: { x: lerp(cam.target.x, this.pos.x, 2.5 * this.engine.GetFrameTime()), y: lerp(cam.target.y, this.pos.y, 2.5 * this.engine.GetFrameTime()) },
                zoom: 1,
                rotation: 0
            }
        }

        if (this.camera) {
            this.camera.DrawWithCamera(() => {
                let _tex = this.tex?.Texture;
                this.engine.DrawTexturePro(
                    this.tex!.Texture,
                    { x: 0, y: 0, width: _tex!.width, height: _tex!.height },
                    { x: this.pos.x, y: this.pos.y, width: _tex!.width, height: _tex!.height },
                    { x: _tex!.width * 2, y: _tex!.height * 2 },
                    0, { r: 255, g: 255, b: 255, a: 255 }
                );
            });
        }
    }

    public OnDestroy(): void {
        this.tex?.delete();
    }
}
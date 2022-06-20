import { Script } from '../Script';
import { CCamera2D, CComponent, CEntity, CTexture, Engine, EngineModule, Vector2 } from '../Engine';


const lerp = (x: number, y: number, t: number) => x * (1 - t) + y * t;

export default class PlayerScript extends Script {
    private pos: Vector2 = { x: 0, y: 0 };
    private tex: CTexture | null | undefined;
    private anotherTex: CTexture | null | undefined;
    
    protected constructor(engine: EngineModule, camera: CCamera2D) {
        super(engine, camera);

        this.OnCreate();
        this.attachedComponent.BindFunction("OnUpdate", () => this.OnUpdate());
    }
    
    public static async Build(camera?: CCamera2D): Promise<PlayerScript> {
        let engine = await Engine.Instance();
        if (camera) return new PlayerScript(engine, camera);
        else throw new Error('No camera passed (PlayerScript)!');
    }
    
    public OnCreate(): void {
        let texture = new this.engine.CTexture();
        texture.Load('res/sprites/player/idle/player-idle-1.png');
        this.tex = texture;

        let anotherTex = new this.engine.CTexture();
        anotherTex.Load('res/sprites/player/idle/player-idle-2.png');
        this.anotherTex = anotherTex;
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
                let _anotherTex = this.anotherTex?.Texture;
                this.engine.DrawTextureTiled(_anotherTex!,
                    { x: 0, y: 0, width: _anotherTex!.width, height: _anotherTex!.height },
                    { x: 0, y: 0, width: this.engine.GetScreenWidth(), height: this.engine.GetScreenWidth() },
                    { x: 1, y: 1 }, 0, 1, { r: 255, g: 255, b: 255, a: 255 });

                let _tex = this.tex?.Texture;
                this.engine.DrawTexturePro(
                    this.tex!.Texture,
                    { x: 0, y: 0, width: _tex!.width, height: _tex!.height },
                    { x: this.pos.x, y: this.pos.y, width: _tex!.width * 3, height: _tex!.height * 3 },
                    { x: _tex!.width * 3 / 2, y: _tex!.height * 3 / 2 },
                    0, { r: 255, g: 255, b: 255, a: 255 }
                );
            });
        }
    }

    public OnDestroy(): void {
        this.tex?.delete();
        this.anotherTex?.delete();
    }
}
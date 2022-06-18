import { Script } from '../Script';
import { CComponent, CEntity, CTexture, Engine, EngineModule, Vector2 } from '../Engine';

export default class PlayerScript extends Script {
    private pos: Vector2 = { x: 0, y: 0 };
    private tex: CTexture | null | undefined;
    
    protected constructor(engine: EngineModule) {
        super(engine);

        this.OnCreate();
        this.attachedComponent.BindFunction("OnUpdate", () => this.OnUpdate());
        this.attachedComponent.BindFunction("OnDestroy", () => {
            this.OnDestroy();
            this.entity.delete();
            this.attachedComponent.delete();
        });
    }
    
    public static async Build(): Promise<PlayerScript> {
        let engine = await Engine.Instance();
        return new PlayerScript(engine);
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

        let _tex = this.tex?.Texture;
        this.engine.DrawTexturePro(
            this.tex!.Texture,
            { x: 0, y: 0, width: _tex!.width, height: _tex!.height },
            { x: this.pos.x, y: this.pos.y, width: _tex!.width * 3, height: _tex!.height * 3 },
            { x: _tex!.width * 3 / 2, y: _tex!.height * 3 / 2 },
            0, { r: 255, g: 255, b: 255, a: 255 }
        );
    }

    public OnDestroy(): void {}
}
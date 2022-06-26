import { Script } from '../Script';
import { CCamera2D, CComponent, CEntity, CTexture, Engine, EngineModule, Vector2 } from '../Engine';
import { CRoom } from '../Room';


const lerp = (x: number, y: number, t: number) => x * (1 - t) + y * t;

enum PlayerFacing {
    Left = 1,
    Right = 3,
    Up = 0,
    Down = 2
};

enum PlayerState {
    Idle = 0,
    Walking = 1
};

const PlayerFrameCount = 8;
const PlayerFrameRate = 5;
const PlayerFrameSize = { width: 64, height: 64 };
const PlayerScale = 1.5;

export default class PlayerScript extends Script {
    private pos: Vector2 = { x: 0, y: 0 };
    private tex: CTexture | null | undefined;
    private roomRef: React.MutableRefObject<CRoom | undefined>;

    private playerState: PlayerState = PlayerState.Idle;
    private playerFacing: PlayerFacing = PlayerFacing.Down;
    private currentFrame: number = 0;
    
    public constructor(engine: EngineModule, camera: CCamera2D, roomRef: React.MutableRefObject<CRoom | undefined>) {
        super(engine, camera);

        this.roomRef = roomRef;

        this.OnCreate();
        this.attachedComponent.BindFunction("OnUpdate", () => this.OnUpdate());
    }
    
    public OnCreate(): void {
        let texture = new this.engine.CTexture();
        texture.Load('res/player_spritesheet.png');
        this.tex = texture;
    }
    
    public OnUpdate(): void {
        // up down left right handle with keycodes
        this.playerState = PlayerState.Idle;

        if (this.engine.IsKeyDown(87)) {
            this.pos.y -= 200 * this.engine.GetFrameTime();
            this.playerFacing = PlayerFacing.Up;
            this.playerState = PlayerState.Walking;
        }

        if (this.engine.IsKeyDown(83)) {
            this.pos.y += 200 * this.engine.GetFrameTime();
            this.playerFacing = PlayerFacing.Down;
            this.playerState = PlayerState.Walking;
        }

        if (this.engine.IsKeyDown(65)) {
            this.pos.x -= 200 * this.engine.GetFrameTime();
            this.playerFacing = PlayerFacing.Left;
            this.playerState = PlayerState.Walking;
        }

        if (this.engine.IsKeyDown(68)) {
            this.pos.x += 200 * this.engine.GetFrameTime();
            this.playerFacing = PlayerFacing.Right;
            this.playerState = PlayerState.Walking;
        }

        if (this.playerState === PlayerState.Idle)
            this.currentFrame = 0;
        else {
            console.log(this.playerState, this.playerFacing);
            if (this.currentFrame > PlayerFrameCount * PlayerFrameRate - 2) this.currentFrame = 0;
            this.currentFrame++;
        }
        
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
                this.engine.DrawTexturePro(
                    this.tex!.Texture,
                    { x: PlayerFrameSize.width * (Math.floor(this.currentFrame / PlayerFrameRate) + this.playerState), y: PlayerFrameSize.height * this.playerFacing, ...PlayerFrameSize },
                    { x: this.pos.x, y: this.pos.y, width: PlayerFrameSize.width * PlayerScale, height: PlayerFrameSize.height * PlayerScale },
                    { x: PlayerFrameSize.width * PlayerScale / 2, y: PlayerFrameSize.height * PlayerScale / 2 },
                    0, { r: 255, g: 255, b: 255, a: 255 }
                );
            });
        }
    }

    public OnDestroy(): void {
        this.tex?.delete();
    }
}
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
let playerYClamp = 555;


export default class PlayerScript extends Script {
    private pos: Vector2 = { x: 400, y: 250 };
    private posSecond: Vector2 = { x: 0, y: 0 };
    private tex: CTexture | null | undefined;
    private secondTex: CTexture | null | undefined;
    private roomRef: React.MutableRefObject<CRoom | undefined>;

    private playerState: PlayerState = PlayerState.Idle;
    private playerFacing: PlayerFacing = PlayerFacing.Down;
    private currentFrame: number = 0;

    private playerStateSecond: PlayerState = PlayerState.Idle;
    private playerFacingSecond: PlayerFacing = PlayerFacing.Down;
    private currentFrameSecond: number = 0;

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

        let secondTexture = new this.engine.CTexture();
        secondTexture.Load('res/player_spritesheet_white.png');
        this.secondTex = secondTexture;
    }
    
    public OnUpdate(): void {
        // up down left right handle with keycodes
        this.playerState = PlayerState.Idle;
        this.playerStateSecond = PlayerState.Idle;

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

        // arrow keys keycode dictionary
        // right = 262; left = 263; down = 264; up = 265

        if (this.engine.IsKeyDown(262)) {
            this.posSecond.x += 200 * this.engine.GetFrameTime();
            this.playerFacingSecond = PlayerFacing.Right;
            this.playerStateSecond = PlayerState.Walking;
        }

        if (this.engine.IsKeyDown(263)) {
            this.posSecond.x -= 200 * this.engine.GetFrameTime();
            this.playerFacingSecond = PlayerFacing.Left;
            this.playerStateSecond = PlayerState.Walking;
        }

        if(this.engine.IsKeyDown(264)) {
            this.posSecond.y += 200 * this.engine.GetFrameTime();
            this.playerFacingSecond = PlayerFacing.Down;
            this.playerStateSecond = PlayerState.Walking;
        }

        if (this.engine.IsKeyDown(265)) {
            this.posSecond.y -= 200 * this.engine.GetFrameTime();
            this.playerFacingSecond = PlayerFacing.Up;
            this.playerStateSecond = PlayerState.Walking;
        }

        // Wants to pickup an object
        if (this.engine.IsKeyDown(69)) {
            let room = this.roomRef.current;
            if (room) {
                let entity = room.GetEntityAt(this.pos);
                if (entity) {
                    if (entity.id === 2)
                    {
                        let badge = room.GetEntityWithId(1);

                        if (badge)
                        {
                            if (badge.show == false )
                            {
                                entity.show = false;
                                
                                document.getElementById("slot")!.style.display = "none";
                                playerYClamp = 835
                    
                                entity.tex.Unload();
                                entity.tex.delete();

                                room.updateBGTexture("bg2.png");
                            }
                        }
                    } else{
                        entity.show = false;
                        entity.tex.Unload();
                        entity.tex.delete();
                    }

                    
                }
            }
        }
            
        if (this.playerState === PlayerState.Idle)
            this.currentFrame = 0;
        else {
            console.log(this.playerState, this.playerFacing);
            if (this.currentFrame > PlayerFrameCount * PlayerFrameRate - 2) this.currentFrame = 0;
            this.currentFrame++;
        }

        if (this.playerStateSecond === PlayerState.Idle)
            this.currentFrameSecond = 0;
        else {
            if (this.currentFrameSecond > PlayerFrameCount * PlayerFrameRate - 2) this.currentFrameSecond = 0;
            this.currentFrameSecond++;
        }
        
        const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);

        this.pos.x = clamp(this.pos.x, 50, 720 - PlayerFrameSize.width);
        this.pos.y = clamp(this.pos.y, 80, playerYClamp - PlayerFrameSize.height);

        this.posSecond.x = clamp(this.posSecond.x, 50, 720 - PlayerFrameSize.width);
        this.posSecond.y = clamp(this.posSecond.y, 80, playerYClamp - PlayerFrameSize.height);
        
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

                this.engine.DrawTexturePro(
                    this.secondTex!.Texture,
                    { x: PlayerFrameSize.width * (Math.floor(this.currentFrameSecond / PlayerFrameRate) + this.playerStateSecond), y: PlayerFrameSize.height * this.playerFacingSecond, ...PlayerFrameSize },
                    { x: this.posSecond.x, y: this.posSecond.y, width: PlayerFrameSize.width * PlayerScale, height: PlayerFrameSize.height * PlayerScale },
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
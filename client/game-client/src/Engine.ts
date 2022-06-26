import { createContext } from "react";
import { EmscriptenModule } from "./EmscriptenTypes";
import createModule from './engine_wasm.js';

export interface Vector2 {
    x: number;
    y: number;
};

export interface Vector3 {
    x: number;
    y: number;
    z: number;
}

export interface Vector4 {
    x: number;
    y: number;
    z: number;
    w: number;
}

export interface Color {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
};

export interface Matrix {
    m0: number;
    m1: number;
    m2: number;
    m3: number;
    m4: number;
    m5: number;
    m6: number;
    m7: number;
    m8: number;
    m9: number;
    m10: number;
    m11: number;
    m12: number;
    m13: number;
    m14: number;
    m15: number;
};

export interface Texture {
    id: number;
    width: number;
    height: number;
    mipmaps: number;
    format: number;
};

export interface RenderTexture {
    id: number;
    depth: Texture;
    texture: Texture;
};

export interface NPatchInfo {
    source: Rectangle;
    left: number;
    top: number;
    right: number;
    bottom: number;
    layout: number;
};

export interface Camera2D {
    offset: Vector2;
    rotation: number;
    target: Vector2;
    zoom: number;
};

export interface CObject {
    delete(): void;
    deleteLater(): void;
    ID: number;
    IsDestroyed: boolean;
}

export interface CComponent extends CObject {
    Name: string;
    BindFunction(name: string, callback: () => void): void;
}

export interface CEntity extends CObject {
    Name: string;
    GetComponent(name: string): CComponent;
    AddComponent(component: CComponent): void;
    RemoveComponent(name: string): void;
}

export interface CTexture extends CObject {
    Texture: Texture;
    Load(path: string): void;
    Unload(): void;
};

export interface CRenderTexture extends CObject {
    RenderTexture: RenderTexture;
    Load(width: number, height: number): void;
    Unload(): void;
    DrawOn(callback: () => void): void;
};

export interface CShader extends CObject {
    Load(vProgram: string, fProgram: string): void;
    LoadVertexOnly(vProgram: string): void;
    LoadFragmentOnly(fProgram: string): void;
    Unload(): void;
    SetShaderValuenumber(uniformName: string, val: number): void;
    SetShaderValueInt(uniformName: string, val: number): void;
    SetShaderValueFVec2(uniformName: string, val: Vector2): void;
    SetShaderValueFVec3(uniformName: string, val: Vector3): void;
    SetShaderValueFVec4(uniformName: string, val: Vector4): void;
    SetShaderValueTexture(uniformName: string, tex: Texture): void;
    SetShaderValueMatrix(uniformName: string, mat: Matrix): void;
    DrawWithShader(callback: () => void): void;
};

export interface CCamera2D extends CObject {
    Camera: Camera2D;
    DrawWithCamera(callback: () => void): void;
};

export interface CAudio extends CObject {
    Unload(): void;
    LoadAsSound(fileName: string): void;
    LoadAsMusic(fileName: string): void;
    Play(): void;
    Stop(): void;
    Pause(): void;
    Resume(): void;
    Seek(position: number): void;
    IsPlaying(): boolean;
    SetVolume(vol: number): void;
    SetPitch(pitch: number): void;
    SetPan(pan: number): void;
}

type CObjectCtor = { new (): CObject };
type CComponentCtor = { new (): CComponent };
type CEntityCtor = { new (): CEntity };
type CTextureCtor = { new (): CTexture };
type CRenderTextureCtor = { new (): CRenderTexture };
type CShaderCtor = { new (): CShaderCtor };
type CCamera2DCtor = { new (): CCamera2D };
type CAudioCtor = { new (): CAudio };

export interface FunctionBindings {
    canvas: HTMLCanvasElement;

    GetScreenWidth(): number;
    GetScreenHeight(): number;
    SetWindowSize(width: number, height: number): void;
    GetFPS(): number;
    GetFrameTime(): number;
    GetTime(): number;
    GetRandomValue(min: number, max: number): number;
    SetRandomSeed(seed: number): number;
    IsKeyPressed(key: number): boolean;
    IsKeyDown(key: number): boolean;
    IsKeyReleased(key: number): boolean;
    IsKeyUp(key: number): void;
    GetKeyPressed(): number;
    GetCharPressed(): number;
    IsMouseButtonPressed(button: number): boolean;
    IsMouseButtonReleased(button: number): boolean;
    IsMouseButtonDown(button: number): boolean;
    IsMouseButtonUp(button: number): boolean;
    GetMouseX(): number;
    GetMouseY(): number;
    GetMousePosition(): Vector2;
    GetMouseDelta(): number;
    SetMousePosition(x: number, y: number): void;
    SetMouseOffset(offsetX: number, offsetY: number): void;
    SetMouseScale(scaleX: number, scaleY: number): void;
    GetMouseWheelMove(): number;
    SetMouseCursor(cursor: number): void;
    ClearBackground(): void;

    DrawPixel(posX: number, posY: number, color: Color): void;
    DrawPixelV(position: Vector2, color: Color): void;
    DrawLine(startPosX: number, startPosY: number, endPosX: number, endPosY: number, color: Color): void;
    DrawLineV(startPos: Vector2, endPos: Vector2): void;
    DrawLineEx(startPos: Vector2, endPos: Vector2, thick: number, color: Color): void;
    DrawLineBezier(startPos: Vector2, endPos: Vector2, thick: number, color: Color): void;
    DrawLineBezierQuad(startPos: Vector2, endPos: Vector2, controlPos: Vector2, thick: number, color: Color): void;
    DrawLineBezierCubic(startPos: Vector2, endPos: Vector2, startControlPos: Vector2, endControlPos: Vector2, thick: number, color: Color): void;
    DrawCircle(centerX: number, centerY: number, radius: number, color: Color): void;
    DrawCircleSector(center: Vector2, radius: number, startAngle: number, endAngle: number, segments: number, color: Color): void;
    DrawCircleSectorLines(center: Vector2, radius: number, startAngle: number, endAngle: number, segments: number, color: Color): void;
    DrawCircleGradient(centerX: number, centerY: number, radius: number, color1: Color, color2: Color): void;
    DrawCircleV(center: Vector2, radius: number, color: Color): void;
    DrawCircleLines(centerX: number, centerY: number, radius: number, color: Color): void;
    DrawEllipse(centerX: number, centerY: number, radiusH: number, radiusV: number, color: Color): void;
    DrawEllipseLines(centerX: number, centerY: number, radiusH: number, radiusV: number, color: Color): void;
    DrawRing(center: Vector2, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number, segments: number, color: Color): void;
    DrawRingLines(center: Vector2, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number, segments: number, color: Color): void;
    DrawRectangle(posX: number, posY: number, width: number, height: number, color: Color): void;
    DrawRectangleV(position: Vector2, size: Vector2, color: Color): void;
    DrawRectangleRec(rec: Rectangle, color: Color): void;
    DrawRectanglePro(rec: Rectangle, origin: Vector2, rotation: number, color: Color): void;
    DrawRectangleGradientV(posX: number, posY: number, width: number, height: number, color1: Color, color2: Color): void;
    DrawRectangleGradientH(posX: number, posY: number, width: number, height: number, color1: Color, color2: Color): void;
    DrawRectangleGradientEx(rec: Rectangle, col1: Color, col2: Color, col3: Color, col4: Color): void;
    DrawRectangleLines(posX: number, posY: number, width: number, height: number, color: Color): void;
    DrawRectangleLinesEx(rec: Rectangle, lineThick: number, color: Color): void;
    DrawRectangleRounded(rec: Rectangle, roundness: number, segments: number, color: Color): void;
    DrawRectangleRoundedLines(rec: Rectangle, roundness: number, segments: number, lineThick: number, color: Color): void;
    DrawTriangle(v1: Vector2, v2: Vector2, v3: Vector2, color: Color): void;
    DrawTriangleLines(v1: Vector2, v2: Vector2, v3: Vector2, color: Color): void;
    DrawPoly(center: Vector2, sides: number, radius: number, rotation: number, color: Color): void;
    DrawPolyLines(center: Vector2, sides: number, radius: number, rotation: number, color: Color): void;
    DrawPolyLinesEx(center: Vector2, sides: number, radius: number, rotation: number, lineThick: number, color: Color): void;
    CheckCollisionRecs(rec1: Rectangle, rec2: Rectangle): void;
    CheckCollisionCircles(center1: Vector2, radius1: number, center2: Vector2, radius2: number): void;
    CheckCollisionCircleRec(center: Vector2, radius: number, rec: Rectangle): void;
    CheckCollisionPointRec(point: Vector2, rec: Rectangle): void;
    CheckCollisionPointCircle(point: Vector2, rec: Rectangle): void;
    CheckCollisionPointTriangle(point: Vector2, p1: Vector2, p2: Vector2, p3: Vector2): void;
    CheckCollisionPointLine(point: Vector2, p1: Vector2, p2: Vector2, threshold: number): void;
    GetCollisionRec(rec1: Rectangle, rec2: Rectangle): void;

    DrawTexture(texture: Texture, posX: number, posY: number, tint: Color): void;
    DrawTextureV(texture: Texture, position: Vector2, tint: Color): void;
    DrawTextureEx(texture: Texture, position: Vector2, rotation: number, scale: number, tint: Color): void;
    DrawTextureRec(texture: Texture, source: Rectangle, position: Vector2, tint: Color): void;
    DrawTextureQuad(texture: Texture, tiling: Vector2, offset: Vector2, quad: Rectangle, tint: Color): void;
    DrawTextureTiled(texture: Texture, source: Rectangle, dest: Rectangle, origin: Vector2, rotation: number, scale: number, tint: Color): void;
    DrawTexturePro(texture: Texture, source: Rectangle, dest: Rectangle, origin: Vector2, rotation: number, tint: Color): void;
    DrawTextureNPatch(texture: Texture, nPatchInfo: NPatchInfo, dest: Rectangle, origin: Vector2, rotation: number, tint: Color): void;

    Fade(color: Color, alpha: number): void;
    ColorToInt(color: Color): void;
    ColorNormalize(color: Color): void;
    ColorFromNormalized(normalized: Vector4): void;
    ColorToHSV(color: Color): void;
    ColorFromHSV(hue: number, saturation: number, value: number): void;
    ColorAlpha(color: Color, alpha: number): void;
    ColorAlphaBlend(dst: Color, src: Color, tint: Color): void;
    GetColor(hexVal: number): void;

    GetFileContents(fileName: string): string;

    EaseLinearNone(t: number, b: number, c: number, d: number): number;
    EaseLinearIn(t: number, b: number, c: number, d: number): number;
    EaseLinearOut(t: number, b: number, c: number, d: number): number;
    EaseLinearInOut(t: number, b: number, c: number, d: number): number;
    EaseSineIn(t: number, b: number, c: number, d: number): number;
    EaseSineOut(t: number, b: number, c: number, d: number): number;
    EaseSineInOut(t: number, b: number, c: number, d: number): number;
    EaseCircIn(t: number, b: number, c: number, d: number): number;
    EaseCircOut(t: number, b: number, c: number, d: number): number;
    EaseCircInOut(t: number, b: number, c: number, d: number): number;
    EaseCubicIn(t: number, b: number, c: number, d: number): number;
    EaseCubicOut(t: number, b: number, c: number, d: number): number;
    EaseCubicInOut(t: number, b: number, c: number, d: number): number;
    EaseQuadIn(t: number, b: number, c: number, d: number): number;
    EaseQuadOut(t: number, b: number, c: number, d: number): number;
    EaseQuadInOut(t: number, b: number, c: number, d: number): number;
    EaseExpoIn(t: number, b: number, c: number, d: number): number;
    EaseExpoOut(t: number, b: number, c: number, d: number): number;
    EaseExpoInOut(t: number, b: number, c: number, d: number): number;
    EaseBackIn(t: number, b: number, c: number, d: number): number;
    EaseBackOut(t: number, b: number, c: number, d: number): number;
    EaseBackInOut(t: number, b: number, c: number, d: number): number;
    EaseBounceOut(t: number, b: number, c: number, d: number): number;
    EaseBounceIn(t: number, b: number, c: number, d: number): number;
    EaseBounceInOut(t: number, b: number, c: number, d: number): number;
    EaseElasticIn(t: number, b: number, c: number, d: number): number;
    EaseElasticOut(t: number, b: number, c: number, d: number): number;
    EaseElasticInOut(t: number, b: number, c: number, d: number): number;

    DrawFPS(posX: number, posY: number): void;
    DrawText(text: string, posX: number, posY: number, fontSize: number, color: Color): void;
    MeasureText(text: string, fontSize: number): number;

    Init(): void;
    Deinit(): void;
    Tick(): void;
    InitComponents(): void;
    DeinitComponents(): void;

    CObject: CObjectCtor;
    CComponent: CComponentCtor;
    CEntity: CEntityCtor;
    CTexture: CTextureCtor;
    CRenderTexture: CRenderTextureCtor;
    CShader: CShaderCtor;
    CCamera2D: CCamera2DCtor;
    CAudio: CAudioCtor;
}

export type EngineModule = EmscriptenModule & FunctionBindings;

export class Engine {
    private static instance: EngineModule;

    static async Instance(): Promise<EngineModule> {
        if (!Engine.instance) {
            Engine.instance = await createModule() as (EngineModule);
        }

        return Engine.instance;
    }
}
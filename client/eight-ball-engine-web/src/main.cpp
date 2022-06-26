#include <iostream>
#include <raylib.h>
#include <emscripten.h>
#include <emscripten/bind.h>
#include "./ecs_manager.hpp"

RenderTexture2D bg;

void Init() {
    InitWindow(1280, 720, "Window");

    bg = LoadRenderTexture(GetScreenWidth(), GetScreenHeight());

    BeginTextureMode(bg);
        ClearBackground({ 22, 25, 46, 255 });
        for (int x = 0; x < 80; x++) {
            int val = GetRandomValue(2, 4);
            struct {
                int x; int y;
            } pos = { GetRandomValue(0, GetScreenWidth()), GetRandomValue(0, GetScreenHeight()) };
            DrawCircle(pos.x, pos.y, val, { 255, 255, 255, 255 });
            DrawCircleGradient(pos.x, pos.y, val + 5, { 255, 255, 255, 255 }, { 0, 0, 0, 0 });
        }
    EndTextureMode();
}

void Deinit() {
    CloseWindow();
    UnloadRenderTexture(bg);
}

void InitComponents() {
    ECS::Create();
}

void DeinitComponents() {
    // ECS::Destroy();
    ObjectManager::GetInstance()->DestroyAllObjects();
}

void Tick() {
    BeginDrawing();
    // ClearBackground({ 22, 25, 46, 255 });
    DrawTexture(bg.texture, 0, 0, WHITE);
    DrawFPS(10, 10);
    // DrawText("Hello!", 100, 100, 100, BLACK);
    ECS::Update();
    EndDrawing();
}

EMSCRIPTEN_BINDINGS(game_module) {
    emscripten::function("Init", &Init);
    emscripten::function("Tick", &Tick);
    emscripten::function("Deinit", &Deinit);
    emscripten::function("InitComponents", &InitComponents);
    emscripten::function("DeinitComponents", &DeinitComponents);
}
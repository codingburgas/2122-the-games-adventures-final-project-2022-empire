#include <iostream>
#include <raylib.h>
#include <emscripten.h>
#include <emscripten/bind.h>

void Init() {
    InitWindow(1280, 720, "Window");
}

void Deinit() {
    CloseWindow();
}

void Tick() {
    BeginDrawing();
    ClearBackground(RAYWHITE);
    DrawFPS(10, 10);
    DrawText("Hello!", 100, 100, 100, BLACK);
    EndDrawing();
}

EMSCRIPTEN_BINDINGS(game_module) {
    emscripten::function("Init", &Init);
    emscripten::function("Tick", &Tick);
    emscripten::function("Deinit", &Deinit);
}
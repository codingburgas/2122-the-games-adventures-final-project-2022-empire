#include <iostream>
#include <raylib.h>
#include <emscripten.h>

int main()
{
    using namespace std;

    InitWindow(1280, 720, "Window");

    while(!WindowShouldClose())
    {
        BeginDrawing();
        ClearBackground(RAYWHITE);
        DrawFPS(10, 10);
        DrawText("Hello!", 100, 100, 100, BLACK);
        EndDrawing();
    }

    CloseWindow();

    return EXIT_SUCCESS;
}
#include "raylib.h"
#include <emscripten/bind.h>

using namespace emscripten;

void DrawTextSafe(const std::string text, int posX, int posY, int fontSize, Color color)
{
    DrawText(text.c_str(), posX, posY, fontSize, color);
}

int MeasureTextSafe(const std::string text, int fontSize)
{
    return MeasureText(text.c_str(), fontSize);
}

EMSCRIPTEN_BINDINGS(raylib_module) {
    // core
    function("SetTargetFPS", &SetTargetFPS);
    function("GetFPS", &GetFPS);
    function("GetFrameTime", &GetFrameTime);
    function("GetTime", &GetTime);
    function("GetRandomValue", &GetRandomValue);
    function("SetRandomSeed", &SetRandomSeed);
    function("IsKeyPressed", &IsKeyPressed);
    function("IsKeyDown", &IsKeyDown);
    function("IsKeyReleased", &IsKeyReleased);
    function("IsKeyUp", &IsKeyUp);
    function("GetKeyPressed", &GetKeyPressed);
    function("GetCharPressed", &GetCharPressed);
    function("IsMouseButtonPressed", &IsMouseButtonPressed);
    function("IsMouseButtonDown", &IsMouseButtonDown);
    function("IsMouseButtonUp", &IsMouseButtonUp);
    function("GetMouseX", &GetMouseX);
    function("GetMouseY", &GetMouseY);
    function("GetMousePosition", &GetMousePosition);
    function("GetMouseDelta", &GetMouseDelta);
    function("SetMousePosition", &SetMousePosition);
    function("SetMouseOffset", &SetMouseOffset);
    function("SetMouseScale", &SetMouseScale);
    function("GetMouseWheelMove", &GetMouseWheelMove);
    function("SetMouseCursor", &SetMouseCursor);

    // shapes
    function("DrawPixel", &DrawPixel);
    function("DrawPixelV", &DrawPixelV);
    function("DrawLine", &DrawLine);
    function("DrawLineV", &DrawLineV);
    function("DrawLineEx", &DrawLineEx);
    function("DrawLineBezier", &DrawLineBezier);
    function("DrawLineBezierQuad", &DrawLineBezierQuad);
    function("DrawLineBezierCubic", &DrawLineBezierCubic);
    function("DrawCircle", &DrawCircle);
    function("DrawCircleSector", &DrawCircleSector);
    function("DrawCircleSectorLines", &DrawCircleSectorLines);
    function("DrawCircleGradient", &DrawCircleGradient);
    function("DrawCircleV", &DrawCircleV);
    function("DrawCircleLines", &DrawCircleLines);
    function("DrawEllipse", &DrawEllipse);
    function("DrawEllipseLines", &DrawEllipseLines);
    function("DrawRing", &DrawRing);
    function("DrawRingLines", &DrawRingLines);
    function("DrawRectangle", &DrawRectangle);
    function("DrawRectangleV", &DrawRectangleV);
    function("DrawRectangleRec", &DrawRectangleRec);
    function("DrawRectanglePro", &DrawRectanglePro);
    function("DrawRectangleGradientV", &DrawRectangleGradientV);
    function("DrawRectangleGradientH", &DrawRectangleGradientH);
    function("DrawRectangleGradientEx", &DrawRectangleGradientEx);
    function("DrawRectangleLines", &DrawRectangleLines);
    function("DrawRectangleLinesEx", &DrawRectangleLinesEx);
    function("DrawRectangleRounded", &DrawRectangleRounded);
    function("DrawRectangleRoundedLines", &DrawRectangleRoundedLines);
    function("DrawTriangle", &DrawTriangle);
    function("DrawTriangleLines", &DrawTriangleLines);
    function("DrawPoly", &DrawPoly);
    function("DrawPolyLines", &DrawPolyLines);
    function("DrawPolyLinesEx", &DrawPolyLinesEx);
    function("CheckCollisionRecs", &CheckCollisionRecs);
    function("CheckCollisionCircles", &CheckCollisionCircles);
    function("CheckCollisionCircleRec", &CheckCollisionCircleRec);
    function("CheckCollisionPointRec", &CheckCollisionPointRec);
    function("CheckCollisionPointCircle", &CheckCollisionPointCircle);
    function("CheckCollisionPointTriangle", &CheckCollisionPointTriangle);
    function("CheckCollisionPointLine", &CheckCollisionPointLine);
    function("GetCollisionRec", &GetCollisionRec);

    // textures
    function("DrawTexture", &DrawTexture);
    function("DrawTextureV", &DrawTextureV);
    function("DrawTextureEx", &DrawTextureEx);
    function("DrawTextureRec", &DrawTextureRec);
    function("DrawTextureQuad", &DrawTextureQuad);
    function("DrawTextureTiled", &DrawTextureTiled);
    function("DrawTexturePro", &DrawTexturePro);
    function("DrawTextureNPatch", &DrawTextureNPatch);

    function("Fade", &Fade);
    function("ColorToInt", &ColorToInt);
    function("ColorNormalize", &ColorNormalize);
    function("ColorFromNormalized", &ColorFromNormalized);
    function("ColorToHSV", &ColorToHSV);
    function("ColorFromHSV", &ColorFromHSV);
    function("ColorAlpha", &ColorAlpha);
    function("ColorAlphaBlend", &ColorAlphaBlend);
    function("GetColor", &GetColor);

    // text
    function("DrawFPS", &DrawFPS);
    function("DrawText", &DrawTextSafe);
    function("MeasureText", &MeasureTextSafe);

    // structs
    value_object<Vector2>("Vector2")
        .field("x", &Vector2::x)
        .field("y", &Vector2::y)
        ;
    
    value_object<Vector3>("Vector3")
        .field("x", &Vector3::x)
        .field("y", &Vector3::y)
        .field("z", &Vector3::z)
        ;
    
    value_object<Vector4>("Vector4")
        .field("x", &Vector4::x)
        .field("y", &Vector4::y)
        .field("z", &Vector4::z)
        .field("w", &Vector4::w)
        ;

    value_object<Color>("Color")
        .field("r", &Color::r)
        .field("g", &Color::g)
        .field("b", &Color::b)
        .field("a", &Color::a)
        ;

    value_object<Rectangle>("Rectangle")
        .field("x", &Rectangle::x)
        .field("y", &Rectangle::y)
        .field("width", &Rectangle::width)
        .field("height", &Rectangle::height)
        ;

    value_object<Matrix>("Matrix")
        .field("m0", &Matrix::m0)
        .field("m1", &Matrix::m1)
        .field("m2", &Matrix::m2)
        .field("m3", &Matrix::m3)
        .field("m4", &Matrix::m4)
        .field("m5", &Matrix::m5)
        .field("m6", &Matrix::m6)
        .field("m7", &Matrix::m7)
        .field("m8", &Matrix::m8)
        .field("m9", &Matrix::m9)
        .field("m10", &Matrix::m10)
        .field("m11", &Matrix::m11)
        .field("m12", &Matrix::m12)
        .field("m13", &Matrix::m13)
        .field("m14", &Matrix::m14)
        .field("m15", &Matrix::m15)
        ;
    
    value_object<Texture>("Texture")
        .field("id", &Texture::id)
        .field("width", &Texture::width)
        .field("height", &Texture::height)
        .field("mipmaps", &Texture::mipmaps)
        .field("format", &Texture::format)
        ;

    value_object<RenderTexture>("RenderTexture")
        .field("id", &RenderTexture::id)
        .field("depth", &RenderTexture::depth)
        .field("texture", &RenderTexture::texture)
        ;

    value_object<NPatchInfo>("NPatchInfo")
        .field("top", &NPatchInfo::top)
        .field("bottom", &NPatchInfo::bottom)
        .field("left", &NPatchInfo::left)
        .field("right", &NPatchInfo::right)
        .field("layout", &NPatchInfo::layout)
        .field("source", &NPatchInfo::source)
        ;
}
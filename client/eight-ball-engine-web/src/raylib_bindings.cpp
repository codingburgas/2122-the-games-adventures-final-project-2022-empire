#include "raylib.h"
#include "./engine_bindings.hpp"
#include <emscripten/bind.h>
#include <memory>

using namespace emscripten;

class CTexture : public CObject
{
private:
    Texture m_tex {};

public:
    CTexture() : CObject() {}

    virtual ~CTexture()
    {
        Unload();
    }

    void Load(std::string texPath)
    {
        m_tex = LoadTexture(texPath.c_str());
    }

    void Unload()
    {
        UnloadTexture(m_tex);
    }

    Texture GetTexture() const
    {
        return m_tex;
    }
};

class CRenderTexture : public CObject
{
private:
    RenderTexture m_rTex {};

public:
    CRenderTexture() : CObject() {}

    virtual ~CRenderTexture()
    {
        Unload();
    }

    void Load(int width, int height)
    {
        m_rTex = LoadRenderTexture(width, height);
    }

    void Unload()
    {
        UnloadRenderTexture(m_rTex);
    }

    void DrawOn(emscripten::val fn)
    {
        BeginTextureMode(m_rTex);
            fn();
        EndTextureMode();
    }

    RenderTexture GetRenderTexture() const
    {
        return m_rTex;
    }
};

class CShader : public CObject
{
private:
    struct ShaderValue
    {
        ShaderUniformDataType dataType;
        int location;
        void *data;
    };

    Shader m_shader {};
    std::unordered_map<std::string, ShaderValue> m_shaderData {};
    
public:
    CShader() : CObject() {}

    virtual ~CShader()
    {
        Unload();
    }

    void Load(std::string vsCode, std::string fsCode)
    {
        Unload();
        m_shader = LoadShaderFromMemory(vsCode.c_str(), fsCode.c_str());
    }

    void LoadVertexOnly(std::string vsCode)
    {
        Unload();
        m_shader = LoadShaderFromMemory(vsCode.c_str(), nullptr);
    }


    void LoadFragmentOnly(std::string fsCode)
    {
        Unload();
        m_shader = LoadShaderFromMemory(nullptr, fsCode.c_str());
    }

    void Unload()
    {
        if (m_shader.id != 0) UnloadShader(m_shader);

        for (auto val : m_shaderData)
        {
            switch(val.second.dataType)
            {
            case SHADER_UNIFORM_FLOAT:
                delete (float*)val.second.data;
                printf("Deallocated SHADER_UNIFORM_FLOAT");
                break;
            case SHADER_UNIFORM_VEC2:
                delete (Vector2*)val.second.data;
                printf("Deallocated SHADER_UNIFORM_VEC2");
                break;
            case SHADER_UNIFORM_VEC3:
                delete (Vector3*)val.second.data;
                printf("Deallocated SHADER_UNIFORM_VEC3");
                break;
            case SHADER_UNIFORM_VEC4:
                delete (Vector4*)val.second.data;
                printf("Deallocated SHADER_UNIFORM_VEC4");
                break;
            case SHADER_UNIFORM_INT:
                delete (int*)val.second.data;
                printf("Deallocated SHADER_UNIFORM_INT");
                break;
            }
        }
    }

    template <typename T>
    ShaderValue GetValue(std::string uniformName)
    {
        if (m_shader.id == 0) return {};

        if (m_shaderData.find(uniformName) != m_shaderData.end())
        {
            return m_shaderData[uniformName];
        }
        
        int shaderLoc = GetShaderLocation(m_shader, uniformName.c_str());
        
        if (shaderLoc == -1) return {};

        auto shaderVal = ShaderValue {
            SHADER_UNIFORM_FLOAT,
            shaderLoc,
            new T
        };

        printf("Allocated data for shader uniform %s", uniformName.c_str());

        m_shaderData[uniformName] = shaderVal;

        return shaderVal;
    }

    void SetShaderValueFloat(std::string uniformName, float value)
    {
        if (m_shader.id == 0) return;
        auto shaderVal = GetValue<float>(uniformName);
        *(float*)shaderVal.data = value;
        SetShaderValue(m_shader, shaderVal.location, shaderVal.data, SHADER_UNIFORM_FLOAT);
    }

    void SetShaderValueInt(std::string uniformName, int value)
    {
        if (m_shader.id == 0) return;
        auto shaderVal = GetValue<int>(uniformName);

        if (shaderVal.dataType != SHADER_UNIFORM_INT)
        {
            printf("WARN: %s is set with a different type", uniformName.c_str());
            return;
        }

        *(int*)shaderVal.data = value;
        SetShaderValue(m_shader, shaderVal.location, shaderVal.data, SHADER_UNIFORM_INT);
    }

    void SetShaderValueFVec2(std::string uniformName, Vector2 value)
    {
        if (m_shader.id == 0) return;
        auto shaderVal = GetValue<Vector2>(uniformName);

        if (shaderVal.dataType != SHADER_UNIFORM_VEC2)
        {
            printf("WARN: %s is set with a different type", uniformName.c_str());
            return;
        }

        *(Vector2*)shaderVal.data = value;
        SetShaderValue(m_shader, shaderVal.location, shaderVal.data, SHADER_UNIFORM_VEC2);
    }

    void SetShaderValueFVec3(std::string uniformName, Vector3 value)
    {
        if (m_shader.id == 0) return;
        auto shaderVal = GetValue<Vector3>(uniformName);

        if (shaderVal.dataType != SHADER_UNIFORM_VEC3)
        {
            printf("WARN: %s is set with a different type", uniformName.c_str());
            return;
        }

        *(Vector3*)shaderVal.data = value;
        SetShaderValue(m_shader, shaderVal.location, shaderVal.data, SHADER_UNIFORM_VEC3);
    }

    void SetShaderValueFVec4(std::string uniformName, Vector4 value)
    {
        if (m_shader.id == 0) return;
        auto shaderVal = GetValue<Vector4>(uniformName);

        if (shaderVal.dataType != SHADER_UNIFORM_VEC4)
        {
            printf("WARN: %s is set with a different type", uniformName.c_str());
            return;
        }

        *(Vector4*)shaderVal.data = value;
        SetShaderValue(m_shader, shaderVal.location, shaderVal.data, SHADER_UNIFORM_VEC4);
    }

    void SetShaderValueTexture(std::string uniformName, Texture tex)
    {
        if (m_shader.id == 0) return;
        int shaderLoc = GetShaderLocation(m_shader, uniformName.c_str());
        ::SetShaderValueTexture(m_shader, shaderLoc, tex);
    }
    
    void SetShaderValueMatrix(std::string uniformName, Matrix mat)
    {
        if (m_shader.id == 0) return;
        int shaderLoc = GetShaderLocation(m_shader, uniformName.c_str());
        ::SetShaderValueMatrix(m_shader, shaderLoc, mat);
    }

    void DrawWithShader(emscripten::val fn)
    {
        BeginShaderMode(m_shader);
            fn();
        EndShaderMode();
    }
};

class CCamera2D : public CObject
{
private:
    Camera2D cam;

public:
    CCamera2D() : CObject() {};

    Camera2D GetCamera() const
    {
        return cam;
    }

    void SetCamera(Camera2D val)
    {
        cam = val;
    }

    void DrawWithCamera(emscripten::val fn)
    {
        BeginMode2D(cam);
            fn();
        EndMode2D();
    }

    virtual ~CCamera2D() = default;
};

class CAudio : public CObject
{
private:
    std::unique_ptr<Sound> snd { nullptr };
    std::unique_ptr<Music> mus { nullptr };

public:
    CAudio() : CObject() {};

    void Unload()
    {
        if (mus)
        {
            UnloadMusicStream(*mus);
            mus.reset();
        }

        if (snd)
        {
            UnloadSound(*snd);
            snd.reset();
        }
    }

    void LoadAsSound(std::string fileName)
    {
        Unload();
        if (!IsAudioDeviceReady())
            InitAudioDevice();
        snd = std::make_unique<Sound>();
        *snd = LoadSound(fileName.c_str());
    }

    void LoadAsMusic(std::string fileName)
    {
        Unload();
        if (!IsAudioDeviceReady())
            InitAudioDevice();
        snd = std::make_unique<Sound>();
        *snd = LoadSound(fileName.c_str());
    }

    void Play()
    {
        if (snd) PlaySound(*snd);
        else if (mus) PlayMusicStream(*mus);
    }

    void Stop()
    {
        if (snd) StopSound(*snd);
        else if (mus) StopMusicStream(*mus);
    }

    void Pause()
    {
        if (snd) PauseSound(*snd);
        else if (mus) PauseMusicStream(*mus);
    }
    
    void Resume()
    {
        if (snd) ResumeSound(*snd);
        else if (mus) ResumeMusicStream(*mus);
    }

    void Seek(float position)
    {
        if (mus) SeekMusicStream(*mus, position);
    }

    bool IsPlaying()
    {
        if (snd) return IsSoundPlaying(*snd);
        else if (mus) return IsMusicStreamPlaying(*mus);
        else return false;
    }

    void SetVolume(float vol)
    {
        if (snd) SetSoundVolume(*snd, vol);
        else if (mus) SetMusicVolume(*mus, vol);
    }

    void SetPitch(float pitch)
    {
        if (snd) SetSoundPitch(*snd, pitch);
        else if (mus) SetMusicPitch(*mus, pitch);
    }

    void SetPan(float pan)
    {
        if (snd) SetSoundPan(*snd, pan);
        else if (mus) SetMusicPan(*mus, pan);
    }
};

void DrawTextSafe(const std::string text, int posX, int posY, int fontSize, Color color)
{
    DrawText(text.c_str(), posX, posY, fontSize, color);
}

int MeasureTextSafe(const std::string text, int fontSize)
{
    return MeasureText(text.c_str(), fontSize);
}

std::string GetFileContents(std::string fileName)
{
    unsigned char *buffer = nullptr;
    unsigned int *length = new unsigned int;
    
    LoadFileData(fileName.c_str(), length);
    std::string out = std::string(reinterpret_cast<char*>(buffer));
    out.resize(*length);
    delete length;
    UnloadFileData(buffer);

    return out;
}

EMSCRIPTEN_BINDINGS(raylib_module) {
    // core
    function("GetScreenWidth", &GetScreenWidth);
    function("GetScreenHeight", &GetScreenHeight);
    function("SetWindowSize", &SetWindowSize);
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
    function("IsMouseButtonReleased", &IsMouseButtonReleased);
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
    function("ClearBackground", &ClearBackground);

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

    // files
    function("GetFileContents", &GetFileContents);

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

    value_array<Matrix>("Matrix")
        .element(&Matrix::m0)
        .element(&Matrix::m1)
        .element(&Matrix::m2)
        .element(&Matrix::m3)
        .element(&Matrix::m4)
        .element(&Matrix::m5)
        .element(&Matrix::m6)
        .element(&Matrix::m7)
        .element(&Matrix::m8)
        .element(&Matrix::m9)
        .element(&Matrix::m10)
        .element(&Matrix::m11)
        .element(&Matrix::m12)
        .element(&Matrix::m13)
        .element(&Matrix::m14)
        .element(&Matrix::m15)
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

    value_object<Camera2D>("Camera2D")
        .field("offset", &Camera2D::offset)
        .field("rotation", &Camera2D::rotation)
        .field("target", &Camera2D::target)
        .field("zoom", &Camera2D::zoom)
        ;

    class_<CTexture, base<CObject>>("CTexture")
        .smart_ptr_constructor("CTexture", &std::make_shared<CTexture>)
        .property("Texture", &CTexture::GetTexture)
        .function("Load", &CTexture::Load)
        .function("Unload", &CTexture::Unload)
        ;

    class_<CRenderTexture, base<CObject>>("CRenderTexture")
        .smart_ptr_constructor("CRenderTexture", &std::make_shared<CRenderTexture>)
        .property("RenderTexture", &CRenderTexture::GetRenderTexture)
        .function("Load", &CRenderTexture::Load)
        .function("Unload", &CRenderTexture::Unload)
        .function("DrawOn", &CRenderTexture::DrawOn)
        ;
    
    class_<CShader, base<CObject>>("CShader")
        .smart_ptr_constructor("CShader", &std::make_shared<CShader>)
        .function("Load", &CShader::Load)
        .function("LoadVertexOnly", &CShader::LoadVertexOnly)
        .function("LoadFragmentOnly", &CShader::LoadFragmentOnly)
        .function("Unload", &CShader::Unload)
        .function("SetShaderValueFloat", &CShader::SetShaderValueFloat)
        .function("SetShaderValueInt", &CShader::SetShaderValueInt)
        .function("SetShaderValueFVec2", &CShader::SetShaderValueFVec2)
        .function("SetShaderValueFVec3", &CShader::SetShaderValueFVec3)
        .function("SetShaderValueFVec4", &CShader::SetShaderValueFVec4)
        .function("SetShaderValueTexture", &CShader::SetShaderValueTexture)
        .function("SetShaderValueMatrix", &CShader::SetShaderValueMatrix)
        .function("DrawWithShader", &CShader::DrawWithShader)
        ;

    class_<CCamera2D, base<CObject>>("CCamera2D")
        .smart_ptr_constructor("CCamera2D", &std::make_shared<CCamera2D>)
        .property("Camera", &CCamera2D::GetCamera, &CCamera2D::SetCamera)
        .function("DrawWithCamera", &CCamera2D::DrawWithCamera)
        ;

    class_<CAudio, base<CObject>>("CAudio")
        .smart_ptr_constructor("CAudio", &std::make_shared<CAudio>)
        .function("Unload", &CAudio::Unload)
        .function("LoadAsSound", &CAudio::LoadAsSound)
        .function("LoadAsMusic", &CAudio::LoadAsMusic)
        .function("Play", &CAudio::Play)
        .function("Stop", &CAudio::Stop)
        .function("Pause", &CAudio::Pause)
        .function("Resume", &CAudio::Resume)
        .function("Seek", &CAudio::Seek)
        .function("IsPlaying", &CAudio::IsPlaying)
        .function("SetVolume", &CAudio::SetVolume)
        .function("SetPitch", &CAudio::SetPitch)
        .function("SetPan", &CAudio::SetPan)
        ;
}
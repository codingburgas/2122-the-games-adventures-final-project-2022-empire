#pragma once

#include "./object_manager.hpp"
#include <raylib.h>
#include <string>
#include <emscripten/fetch.h>

class CTexture : public Object
{
private:
    Texture m_tex {};

public:
    DEFINE_OBJECT(CTexture)

    virtual ~CTexture();

    void Load(std::string texPath);
    void Unload();
    Texture GetTexture();
};
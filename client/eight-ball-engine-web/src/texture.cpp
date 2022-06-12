#include "./texture.hpp"
#include <emscripten/fetch.h>

void CTexture::Load(std::string texPath)
{
    m_tex = LoadTexture(texPath.c_str());
}

void CTexture::Unload()
{
    UnloadTexture(m_tex);
}

CTexture::~CTexture()
{
    Unload();
}
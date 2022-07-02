#pragma once

#include "./entity.hpp"
#include "./object_manager.hpp"
#include <vector>
#include <string>
#include <memory>

namespace ECS
{
    std::weak_ptr<Entity> CreateEntity();

    template <typename CT>
    std::weak_ptr<CT> CreateComponent()
    {
        static_assert(std::is_base_of<Component, CT>::value, "CT must inherit from Component");
        return ObjectManager::GetInstance()->CreateObject<CT>();
    }

    std::weak_ptr<Entity> GetEntityFromID(unsigned int id);
    std::weak_ptr<Entity> GetEntityFromName(std::string);

    void Create();
    void Update();
    void Destroy();
}
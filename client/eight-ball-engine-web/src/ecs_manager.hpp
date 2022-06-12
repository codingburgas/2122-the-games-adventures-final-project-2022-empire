#pragma once

#include "./entity.hpp"
#include "./object_manager.hpp"
#include <vector>

namespace ECS
{
    std::vector<std::weak_ptr<Entity>> Entities {};

    std::weak_ptr<Entity> CreateEntity()
    {
        auto ent = ObjectManager::GetInstance()->CreateObject<Entity>();
        Entities.push_back(ent);
        return ent;
    }

    template <typename CT>
    std::weak_ptr<CT> CreateComponent()
    {
        static_assert(std::is_base_of<Component, CT>::value, "CT must inherit from Component");
        return ObjectManager::GetInstance()->CreateObject<CT>();
    }

    void Create();
    void Update();
    void Destroy();
}
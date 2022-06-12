#include "./ecs_manager.hpp"

void ECS::Create()
{
    auto entsCopy = Entities;
    for (auto it = entsCopy.begin(); it != entsCopy.end(); ++it)
    {
        if ((*it).expired())
        {
            Entities.erase(Entities.begin() + (it - entsCopy.begin()));
            continue;
        }
        
        auto components = (*it).lock()->GetComponents();
        for (auto comp : components)
        {
            if (comp.second.expired())
            {
                (*it).lock()->RemoveComponent(comp.first);
                continue;
            }
            
            comp.second.lock()->OnCreate();
        }
    }
}

void ECS::Update()
{
    auto entsCopy = Entities;
    for (auto it = entsCopy.begin(); it != entsCopy.end(); ++it)
    {
        if ((*it).expired())
        {
            Entities.erase(Entities.begin() + (it - entsCopy.begin()));
            continue;
        }
        
        auto components = (*it).lock()->GetComponents();
        for (auto comp : components)
        {
            if (comp.second.expired())
            {
                (*it).lock()->RemoveComponent(comp.first);
                continue;
            }

            if (!comp.second.lock()->Active) continue;
            
            comp.second.lock()->OnUpdate();
        }
    }
}

void ECS::Destroy()
{
    for (auto it = Entities.begin(); it != Entities.end(); ++it)
    {
        if ((*it).expired()) continue;
        
        auto components = (*it).lock()->GetComponents();
        for (auto comp : components)
        {
            if (comp.second.expired()) continue;
            if (!comp.second.lock()->Active) continue;
            
            comp.second.lock()->OnDestroy();
        }
    }
    
    Entities.clear();
}
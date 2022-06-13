#include "./ecs_manager.hpp"

static std::vector<std::weak_ptr<Entity>> Entities {};

std::weak_ptr<Entity> ECS::CreateEntity()
{
    auto ent = ObjectManager::GetInstance()->CreateObject<Entity>();
    Entities.push_back(ent);
    return ent;
}

std::weak_ptr<Entity> ECS::GetEntityFromID(unsigned int id)
{
    auto wPtr = ObjectManager::GetInstance()->GetObjectFromID(id);
    if (wPtr.expired()) return std::weak_ptr<Entity>();

    return std::static_pointer_cast<Entity>(wPtr.lock());
}

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
        for (auto compIt = components.begin(); compIt != components.end(); compIt++)
        {
            if ((*compIt).expired())
            {
                (*it).lock()->RemoveComponent(components.begin() - compIt);
                continue;
            }
            
            (*compIt).lock()->OnCreate();
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
        for (auto compIt = components.begin(); compIt != components.end(); compIt++)
        {
            if ((*compIt).expired())
            {
                (*it).lock()->RemoveComponent(components.begin() - compIt);
                continue;
            }

            if (!(*compIt).lock()->Active) continue;
            
            (*compIt).lock()->OnUpdate();
        }
    }
}

void ECS::Destroy()
{
    for (auto it = Entities.begin(); it != Entities.end(); ++it)
    {
        if ((*it).expired()) continue;
        
        auto components = (*it).lock()->GetComponents();
        for (auto compIt = components.begin(); compIt != components.end(); compIt++)
        {
            if ((*compIt).expired()) continue;
            
            (*compIt).lock()->OnDestroy();
        }
    }
    
    Entities.clear();
}

std::weak_ptr<Entity> ECS::GetEntityFromName(std::string name)
{
    for (auto ent : Entities)
    {
        if (ent.lock()->Name == name)
            return ent;
    }

    return std::weak_ptr<Entity>(); /* null */
}
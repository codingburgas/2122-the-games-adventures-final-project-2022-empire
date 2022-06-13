#pragma once

#include <iostream>
#include <memory>
#include <string>
#include <list>
#include <cassert>

#include "./object_manager.hpp"
#include "./component.hpp"

class Entity : public Object
{
private:
    std::map<std::string, std::weak_ptr<Component>> m_boundComponents;
    
public:
    DEFINE_OBJECT(Entity);

    virtual ~Entity() = default;

    auto GetComponents()
    {
        return m_boundComponents;
    }

    void AddComponent(std::weak_ptr<Component> component);
    std::weak_ptr<Component> GetComponent(std::string componentName);
    void RemoveComponent(std::string componentName);

    std::string Name {};
};
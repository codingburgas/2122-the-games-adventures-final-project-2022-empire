#pragma once

#include "./object_manager.hpp"

class Component : public Object
{
protected:
    std::weak_ptr<Object> m_boundEntity {};
public:
    /**
     * @brief Define a new object of type component
     */
    DEFINE_OBJECT(Component)

    virtual ~Component() = default;
    virtual const char* ComponentName() { return nullptr; }

    bool Active = true;

    virtual void OnCreate() {}
    virtual void OnDestroy() {}
    virtual void OnUpdate() {}

    void BindToEntity(std::weak_ptr<Object> object);
    void BindToEntity(unsigned long long _id);
    std::weak_ptr<Component> GetComponent(std::string);
};
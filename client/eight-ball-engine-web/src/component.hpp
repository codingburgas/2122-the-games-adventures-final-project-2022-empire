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
    void BindToEntity(unsigned int _id);
    std::weak_ptr<Component> GetComponent(std::string);
};

/**
 * @brief Define a component of a type
 */
#define DEFINE_COMPONENT(TYPE) \
    TYPE(unsigned int _id) : Component(_id) {}; \
    const char* ComponentName() override { return #TYPE; };

/**
 * @brief Define a derived component of type and the type of the base component
 */
#define DEFINE_DERIVED_COMPONENT(TYPE, BASETYPE) \
    TYPE(unsigned int _id) : BASETYPE(_id) {}; \
    const char* ComponentName() override { return #TYPE; };

/**
 * @brief Get component by type
 */
#define MGetComponent(ComponentType) std::static_pointer_cast<ComponentType>(GetComponent(#ComponentType).lock())
#define MGetComponentFrom(From, ComponentType) std::static_pointer_cast<ComponentType>(From->GetComponent(#ComponentType).lock())
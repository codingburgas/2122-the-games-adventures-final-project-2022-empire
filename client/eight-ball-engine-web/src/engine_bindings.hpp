#pragma once

#include <emscripten/val.h>
#include "./object_manager.hpp"
#include "./ecs_manager.hpp"
#include <unordered_map>
#include <string>
#include <memory>
#include <functional>

class JSComponent : public Component
{
private:
    void CallFunction(std::string name)
    {
        if (EventFunctions.find(name) == EventFunctions.end()) return;
        else EventFunctions[name]();
    }

public:
    DEFINE_COMPONENT(JSComponent)

    virtual ~JSComponent() = default;

    void OnCreate() override
    {
        CallFunction("OnCreate");
    }

    void OnUpdate() override
    {
        CallFunction("OnUpdate");
    }

    void OnDestroy() override
    {
        CallFunction("OnDestroy");
    }

    std::string JSName {};
    std::unordered_map<std::string, std::function<void()>> EventFunctions {};
};

class CObject
{
protected:
    std::weak_ptr<Object> ptr;

public:
    CObject(bool createObject = true)
    {
        if (createObject)
            ptr = ObjectManager::GetInstance()->CreateObject<Object>().lock();
    }

    bool IsDestroyed() const
    {
        return ptr.expired();
    }

    int GetID() const
    {
        if (ptr.expired()) return -1;
        else return ptr.lock()->GetID();
    }

    template <typename T>
    std::weak_ptr<T> GetNative()
    {
        if (ptr.expired()) return std::weak_ptr<T>(); /* null */
        return std::static_pointer_cast<T>(ptr.lock());
    }

    virtual ~CObject()
    {
        if (ptr.expired()) return;
        ObjectManager::GetInstance()->DestroyObjectFromID(ptr.lock()->GetID());
    }
};

class CComponent;

class CEntity : public CObject
{
private:
    std::vector<std::weak_ptr<CComponent>> m_boundJSComponents;

public:
    CEntity() : CObject(false)
    {
        ptr = ECS::CreateEntity();
        printf("CE: Created CEntity\n");
    }

    std::string GetName() const
    {
        if (ptr.expired()) return "";
        else return std::static_pointer_cast<Entity>(ptr.lock())->Name;
    }

    void SetName(std::string name)
    {
        if (ptr.expired()) return;
        else std::static_pointer_cast<Entity>(ptr.lock())->Name = name;
    }

    void AddComponent(std::shared_ptr<CComponent> component);

    std::shared_ptr<CComponent> GetComponent(std::string componentName);
    
    void RemoveComponent(std::string componentName);
    
    virtual ~CEntity()
    {
        printf("CE: Destroyed CEntity\n");
    }
};

class CComponent : public CObject
{
private:
    std::weak_ptr<CEntity> m_boundEntity {};

public:
    CComponent() : CObject(false)
    {
        ptr = ECS::CreateComponent<JSComponent>();
        printf("CC: Created CComponent\n");
    }

    void BindFunction(std::string name, emscripten::val fn)
    {
        if (ptr.expired()) return;
        std::static_pointer_cast<JSComponent>(ptr.lock())->EventFunctions[name] = [=]() { fn(); };
    }

    void BindToEntity(std::shared_ptr<CEntity> entity)
    {
        auto native = entity->GetNative<Entity>();
        if (native.expired()) return;

        m_boundEntity = entity;
        printf("CC: Bound to entity\n");
    }

    std::string GetName() const
    {
        if (ptr.expired()) return "";
        else return std::static_pointer_cast<JSComponent>(ptr.lock())->JSName;
    }

    void SetName(std::string name)
    {
        if (ptr.expired()) return;
        else std::static_pointer_cast<JSComponent>(ptr.lock())->JSName = name;
    }

    virtual ~CComponent()
    {
        printf("CC: Destroyed CComponent\n");

        if (m_boundEntity.expired()) return;
        if (ptr.expired()) return;

        m_boundEntity.lock()->RemoveComponent(GetNative<JSComponent>().lock()->JSName);
    };
};
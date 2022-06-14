#include <emscripten/bind.h>
#include <emscripten/val.h>
#include "./object_manager.hpp"
#include "./ecs_manager.hpp"
#include <unordered_map>
#include <string>
#include <memory>

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

void CEntity::AddComponent(std::shared_ptr<CComponent> component)
{
    auto native = component->GetNative<JSComponent>();
    if (native.expired()) return;

    GetNative<Entity>().lock()->AddComponent(native);
    m_boundJSComponents.push_back(component);
    
    printf("CE: Added CComponent with name [%s]\n", native.lock()->JSName.c_str());
}

std::shared_ptr<CComponent> CEntity::GetComponent(std::string componentName)
{
    for (auto comp : m_boundJSComponents)
    {
        if (comp.expired()) continue;
        auto jsComp = comp.lock()->GetNative<JSComponent>();
        if (jsComp.expired()) continue;
        if (jsComp.lock()->JSName == componentName)
            return comp.lock();
    }
    
    return std::shared_ptr<CComponent>(nullptr);
}

void CEntity::RemoveComponent(std::string componentName)
{
    for (auto compIt = m_boundJSComponents.begin(); compIt != m_boundJSComponents.end(); ++compIt)
    {
        if ((*compIt).expired()) continue;
        auto jsComp = (*compIt).lock()->GetNative<JSComponent>();
        if (jsComp.expired()) continue;
        if (jsComp.lock()->JSName == componentName)
        {
            m_boundJSComponents.erase(compIt);
            auto nativeEnt = GetNative<Entity>();
            if (!nativeEnt.expired())
                nativeEnt.lock()->RemoveComponent(compIt - m_boundJSComponents.begin());
            printf("CE: Removed CComponent\n");
            return;
        }
    }
}

EMSCRIPTEN_BINDINGS(engine_bindings) {
    using namespace emscripten;

    class_<CObject>("CObject")
        .smart_ptr_constructor("CObject", &std::make_shared<CObject>)
        .property("ID", &CObject::GetID)
        .property("IsDestroyed", &CObject::IsDestroyed)
        ;
    
    class_<CEntity, base<CObject>>("CEntity")
        .smart_ptr_constructor("CEntity", &std::make_shared<CEntity>)
        .property("Name", &CEntity::GetName, &CEntity::SetName)
        .function("GetComponent", &CEntity::GetComponent)
        .function("AddComponent", &CEntity::AddComponent)
        .function("RemoveComponent", &CEntity::RemoveComponent)
        ;

    class_<CComponent, base<CObject>>("CComponent")
        .smart_ptr_constructor("CComponent", &std::make_shared<CComponent>)
        .property("Name", &CComponent::GetName, &CComponent::SetName)
        .function("BindFunction", &CComponent::BindFunction)
        .function("BindToEntity", &CComponent::BindToEntity)
        ;
}
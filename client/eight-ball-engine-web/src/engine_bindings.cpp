#include <emscripten/bind.h>
#include "./object_manager.hpp"
#include "./ecs_manager.hpp"

using namespace emscripten;

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

    virtual ~CObject()
    {
        if (ptr.expired()) return;
        ObjectManager::GetInstance()->DestroyObjectFromID(ptr.lock()->GetID());
    }
};

class CEntity : public CObject
{
public:
    CEntity() : CObject(false)
    {
        ptr = ECS::CreateEntity();
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

    virtual ~CEntity() = default;
};

EMSCRIPTEN_BINDINGS(engine_bindings) {
    class_<CObject>("CObject")
        .smart_ptr_constructor("CObject", &std::make_shared<CObject>)
        .property("ID", &CObject::GetID)
        .property("IsDestroyed", &CObject::IsDestroyed)
        ;
    
    class_<CEntity, base<CObject>>("CEntity")
        .smart_ptr_constructor("CEntity", &std::make_shared<CEntity>)
        .property("Name", &CEntity::GetName, &CEntity::SetName)
        ;
}
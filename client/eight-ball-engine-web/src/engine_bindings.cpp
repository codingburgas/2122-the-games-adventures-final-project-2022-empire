#include <emscripten/bind.h>
#include <emscripten/val.h>
#include "./object_manager.hpp"
#include "./ecs_manager.hpp"
#include <unordered_map>
#include <string>
#include <memory>
#include "./engine_bindings.hpp"

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
#include "./entity.hpp"

void Entity::AddComponent(std::weak_ptr<Component> component)
{
    assert(!component.expired() && "An attempt was made to bind an expired Component");
    assert(component.lock()->ComponentName() != nullptr && "An attempt was made to bind an instance of the base Component class");
    // assert(!component.lock()->IsUsed && "An attempt was made to bind a used Component");

    /**
     * @brief Creates a shared_ptr of the component parameter
     */
    auto sharedComponent = component.lock();

    /**
     * @brief Sets the component name and binds it to the entity in which it's used, then adds it to the component pool
     */
    std::string componentName = sharedComponent->ComponentName();
    assert(m_boundComponents.find(componentName) == m_boundComponents.end() && "An attempt was made to bind an already existing component type");
    
    sharedComponent->BindToEntity(this->GetID());
    m_boundComponents[componentName] = component;
}

std::weak_ptr<Component> Entity::GetComponent(std::string componentName)
{
    /**
     * @brief If the component is found in the pool, it returns it, else it returns empty
     */
    if (m_boundComponents.find(componentName) != m_boundComponents.end())
        return m_boundComponents[componentName];
    else return std::weak_ptr<Component>();
}

void Entity::RemoveComponent(std::string componentName)
{
    if (m_boundComponents.find(componentName) == m_boundComponents.end()) return;

    ObjectManager::GetInstance()->DestroyObjectFromID(m_boundComponents[componentName].lock()->GetID());
    m_boundComponents.erase(componentName);
}
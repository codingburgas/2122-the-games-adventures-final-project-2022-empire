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
    // assert(m_boundComponents.find(componentName) == m_boundComponents.end() && "An attempt was made to bind an already existing component type");
    
    sharedComponent->BindToEntity(this->GetID());
    // m_boundComponents[componentName] = component;
    m_boundComponents.push_back(component);
}

std::weak_ptr<Component> Entity::GetComponent(std::string componentName)
{
    /**
     * @brief If the component is found in the pool, it returns it, else it returns empty
     */
    for (auto comp : m_boundComponents)
    {
        if (comp.expired()) continue;
        if (std::string { comp.lock()->ComponentName() } == componentName)
            return comp;
    }
    return std::weak_ptr<Component>();
}

void Entity::RemoveComponent(std::string componentName)
{

    for (auto it = m_boundComponents.begin(); it != m_boundComponents.end(); ++it)
    {
        if ((*it).expired()) continue;

        if (std::string { (*it).lock()->ComponentName() } == componentName)
        {
            ObjectManager::GetInstance()->DestroyObjectFromID((*it).lock()->GetID());
            m_boundComponents.erase(it);
            return;
        }
    }
}

void Entity::RemoveComponent(unsigned int vectorIndex)
{
    try {
        m_boundComponents.at(vectorIndex);
        m_boundComponents.erase(m_boundComponents.begin() + vectorIndex);
    } catch (std::exception *e) {
        return;
    }
}
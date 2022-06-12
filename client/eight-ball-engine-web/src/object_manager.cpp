
#include "./object_manager.hpp"

uint64_t ObjectManager::s_currentId = 0;
ObjectManager* ObjectManager::s_instance = nullptr;

bool ObjectManager::CheckBaseName(std::weak_ptr<Object> object, const char* name)
{
    assert(!object.expired() && "Passed an expired object in CheckBaseName");
    assert(object.lock()->ObjectBaseName() && "Passed an empty object with no BaseName");
    assert(name && "Passed nullptr on second argument name");

    if (strcmp(object.lock()->ObjectBaseName(), name) == 0)
        return true;
    return false;
}

ObjectManager* ObjectManager::GetInstance()
{
    if (s_instance == nullptr)
        s_instance = new ObjectManager();

    return s_instance;
}

void ObjectManager::DestroyAllObjects()
{
    m_objectTable.clear();
}

void ObjectManager::DestroyObjectFromID(uint64_t id)
{
    m_objectTable.erase(id);
}

std::weak_ptr<Object> ObjectManager::GetObjectFromID(uint64_t id)
{
    if (m_objectTable.find(id) != m_objectTable.end())
        return m_objectTable[id];
    else return std::weak_ptr<Object>(); /* null */
}
#pragma once

#include <list>
#include <map>
#include <memory>
#include <cstring>
#include <cassert>
#include <cstdio>
#include <type_traits>

class Object
{
private:
    unsigned int id;
    
public:
    Object(unsigned int _id) : id(_id) {};
    virtual ~Object()
    {
        printf("Destroyed Object with id %u\n", id);
    }

    virtual const char* ObjectBaseName() { return nullptr; }
    inline unsigned int GetID() const { return id; }
};

#define DEFINE_OBJECT(TYPE) \
    TYPE(unsigned int id) : Object(id) {}; \
    const char* ObjectBaseName() override { return #TYPE; };

class ObjectManager
{
private:
    std::map<unsigned int, std::shared_ptr<Object>> m_objectTable;

    static unsigned int s_currentId;
    static ObjectManager* s_instance;

    ObjectManager() : m_objectTable() {};
    ~ObjectManager() = default;

public:
    // disallow cloning singleton
    ObjectManager(ObjectManager const&) = delete;

    // disallow assignments to singleton
    void operator=(ObjectManager const&) = delete;

    static ObjectManager* GetInstance();
    static bool CheckBaseName(std::weak_ptr<Object> object, const char* name);

    template <typename ObjectType>
    std::weak_ptr<ObjectType> CreateObject()
    {
        static_assert(std::is_base_of<Object, ObjectType>::value, "ObjectType must inherit from Object");

        std::shared_ptr<ObjectType> current = std::make_shared<ObjectType>(s_currentId);
        m_objectTable[s_currentId] = std::static_pointer_cast<Object>(current);
        s_currentId++;
        return current;
    }

    void DestroyAllObjects();
    void DestroyObjectFromID(unsigned int id);
    std::weak_ptr<Object> GetObjectFromID(unsigned int id);
};
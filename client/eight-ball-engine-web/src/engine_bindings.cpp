#include <emscripten/bind.h>
#include "./object_manager.hpp"

using namespace emscripten;

std::shared_ptr<Object> CreateEmptyObject()
{
    return ObjectManager::GetInstance()->CreateObject<Object>().lock();
}

void nothing(unsigned int) {}

EMSCRIPTEN_BINDINGS(engine_bindings) {
    class_<Object>("GameObject")
        .smart_ptr_constructor("GameObject", &CreateEmptyObject)
        .property("id", &Object::GetID)
        ;
}
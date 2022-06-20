#include <easings.h>
#include <emscripten/bind.h>

using namespace emscripten;

EMSCRIPTEN_BINDINGS(easings_module) {
    function("EaseLinearNone", &EaseLinearNone);
    function("EaseLinearIn", &EaseLinearIn);
    function("EaseLinearOut", &EaseLinearOut);
    function("EaseLinearInOut", &EaseLinearInOut);
    function("EaseSineIn", &EaseSineIn);
    function("EaseSineOut", &EaseSineOut);
    function("EaseSineInOut", &EaseSineInOut);
    function("EaseCircIn", &EaseCircIn);
    function("EaseCircOut", &EaseCircOut);
    function("EaseCircInOut", &EaseCircInOut);
    function("EaseCubicIn", &EaseCubicIn);
    function("EaseCubicOut", &EaseCubicOut);
    function("EaseCubicInOut", &EaseCubicInOut);
    function("EaseQuadIn", &EaseQuadIn);
    function("EaseQuadOut", &EaseQuadOut);
    function("EaseQuadInOut", &EaseQuadInOut);
    function("EaseExpoIn", &EaseExpoIn);
    function("EaseExpoOut", &EaseExpoOut);
    function("EaseExpoInOut", &EaseExpoInOut);
    function("EaseBackIn", &EaseBackIn);
    function("EaseBackOut", &EaseBackOut);
    function("EaseBackInOut", &EaseBackInOut);
    function("EaseBounceOut", &EaseBounceOut);
    function("EaseBounceIn", &EaseBounceIn);
    function("EaseBounceInOut", &EaseBounceInOut);
    function("EaseElasticIn", &EaseElasticIn);
    function("EaseElasticOut", &EaseElasticOut);
    function("EaseElasticInOut", &EaseElasticInOut);
}
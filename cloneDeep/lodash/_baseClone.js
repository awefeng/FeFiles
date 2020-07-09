var Stack = require('./_Stack'), //lodash中栈的实现
    arrayEach = require('./_arrayEach'), 
    assignValue = require('./_assignValue'),
    baseAssign = require('./_baseAssign'),
    baseAssignIn = require('./_baseAssignIn'),
    cloneBuffer = require('./_cloneBuffer'),
    copyArray = require('./_copyArray'),
    copySymbols = require('./_copySymbols'),
    copySymbolsIn = require('./_copySymbolsIn'),
    getAllKeys = require('./_getAllKeys'),
    getAllKeysIn = require('./_getAllKeysIn'),
    getTag = require('./_getTag'),
    initCloneArray = require('./_initCloneArray'),
    initCloneByTag = require('./_initCloneByTag'),
    initCloneObject = require('./_initCloneObject'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isMap = require('./isMap'),
    isObject = require('./isObject'),
    isSet = require('./isSet'),
    keys = require('./keys');

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
/** 类型转换城toString后的结果 */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
/** 区分不同对象类型该怎么克隆 */
/** JS语言层 Symbol.toStringTag 的作用 */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private // baseClone 不对外提供
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.  标志位
 *  1 - Deep clone // 进行深拷贝
 *  2 - Flatten inherited properties // “展平” 继承的属性 => 是否克隆继承的属性
 *  4 - Clone symbols  // 克隆 symbol
 * @param {Function} [customizer] The function to customize cloning. // 自定义克隆方法 和 参数key object 联动用
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.  // 检测循环的栈
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  // 声明结果 result === undefined，计算是否进行深拷贝，是否展平，是否所有类型 （有点不太严谨 isSymbol?）
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;
  // 如果有自定义克隆方法 先执行自定义克隆方法
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  // 自定义克隆方法 返回了结果 直接返回
  if (result !== undefined) {
    return result;
  }
  // 基本类型直接返回 isObject(Symbol()) => false, 这里就解释了cloneDeep以后a.symbol === b.symbol => true 
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    // 处理数组 先初始化一个数组出来
    result = initCloneArray(value);
    if (!isDeep) {
      // 如果是浅拷贝，直接复制了返回不进行后面的逻辑
      return copyArray(value, result);
    }
    // 深拷贝的逻辑这里不用写，不return就行了
  } else {
    // 处理
    // getTag可以简单的理解为获取value的类型 google搜索 Symbol.toStringTag
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;
    // 检查是否是node的缓冲区类型 
    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    // 类型 object args 或者是函数
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      // 原型链或者函数的情况 初始化一个空对象
      // 否则初始化对象后一次拷贝进去
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        // 如果要拷贝原型链 则拷贝自身以及继承的symbols，否则只拷贝自身的
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      // cloneableTags[errorTag] = cloneableTags[funcTag] =
      // cloneableTags[weakMapTag] = false;
      // cloneableTags里面只有error,function,和weakMap类型会返回false
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  // 用“栈”来处理循环引用
  stack || (stack = new Stack);
  // 如果在栈里面已经有这个值了
  // 只有引用对象类型才会走到这一步逻辑，如果栈里面在前面的递归拷贝中已经存进来过，相当于有一个引用环，则直接返回
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  // 如果不存在，则入栈
  stack.set(value, result);
  // set和map新增key的方法和object不一样，所以写出来(add, set)
  // 处理Set
  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
    // 处理 Map
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  // 获取key的function
  // isFull -> false不含symbol
  // isFlat -> 是否摊平
  // getAllKeysIn -> 获取一个包含 自身 和 原型链上属性 和symbol的key array
  // getAllKeys 不含原型链 
  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);
  // 如果是数组就不去获取Key, 如果不是就去获取Key 
  var props = isArr ? undefined : keysFunc(value);
  // Array.forEach简易版 不支持迭代器
  // 这里参数肯定是个array 
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    // 递归克隆，易受调用栈的限制, -> 主要是取决于被深拷贝的对象的层级深度。
    // assignValue -> 起到个赋值功能
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;

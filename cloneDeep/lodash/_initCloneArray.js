/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
    // 这里是取传进来的数据的构造函数 然后来new    
    // 相当于 new Array(length)
    // 一般情况下不会出问题
    /**
     * const noProtoArray = []
     * Object.setPrototypeOf(noProtoArray, null)
     * console.log(Array.isArray(noProtoArray)) // true
     * new noProtoArray.constructor(length) // 报错
     */
    // https://juejin.im/post/5dd7a0096fb9a07ae56fc971
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  // 这里处理正则exec返回的情况
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    // 这里就解释了我们bug在执行cloneDeep的时候的情况
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

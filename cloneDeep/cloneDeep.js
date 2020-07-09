function isObject(data){
  const type = typeof data
  return (type === 'object' || type === 'function') && data !== null
}
// 深拷贝 只考虑数组和普通对象
const cloneDeepByRecursion =function (data){
  if(!isObject(data)){return data}
  let result = Array.isArray(data) ? [...data] : {...data}
  // for in 不能拷贝Symbol
  Reflect.ownKeys(result).forEach(key => {
    result[key] = cloneDeepByRecursion(result[key])
  })    
  return result
}

// 反序列化 序列化
const cloneDeepByFlatten = function(data){
  return JSON.parse(JSON.stringify(data))
}


module.exports = {
  cloneDeepByRecursion,
  cloneDeepByFlatten
}


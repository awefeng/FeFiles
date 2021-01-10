function get(obj, path, defaultValue){
    if(obj !== Object(obj)){
        throw new Error('不是对象')
    }
    let pathType = Array.isArray(path) ? 'array' : (typeof path === 'string' ? 'string' : undefined)
    if(!pathType){
        throw new Error('path不符合要求')
    }
    if(pathType === 'array'){
        let result = obj
        for (let key of path) {
            result = result[key]
            if(result === undefined){
                return defaultValue
            }
        }
        return result
    }else if(pathType === 'string'){
        let keys = path.split('.')
        let result = obj
        for (let key of keys) {
            result = result[key]
            if(result === undefined){
                return defaultValue
            }
        }
        return result
    }
    return defaultValue
}

let result = get({name: 'awefeng', info: {one: ['one'], two: 'two'}}, ['info', 'one', 0], 'defaultValue')
console.log(result)
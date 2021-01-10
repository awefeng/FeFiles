function cloneDeep(oldObj){
	function isObject(obj){return obj === Object(obj)}
    
    if(!isObject(oldObj)){return oldObj}
    
    let newObj = Array.isArray(oldObj) ? [...oldObj] : {...oldObj}
    
    Reflect.ownKeys(newObj).forEach(key => {
        isObject(newObj[key]) ? newObj[key] = cloneDeep(newObj[key]) : undefined
    })
    
    return newObj
}
let obj = {name: 'awefeng', arr: [1, 3, 2]}

const newObj = cloneDeep(obj)

console.log(newObj === obj)
console.log(JSON.stringify(newObj))

function cloneDeep(obj){
    function isObject(obj){return obj===Object(obj)}
    if(!isObject(obj)){return obj}
    let newObj = Array.isArray(obj) ? [...obj] : {...obj}
    Reflect.ownKeys(newObj).forEach(key => {
        newObj[key] = isObject(obj[key]) ? cloneDeep(obj[key]) : obj[key]
    })
    return newObj
}
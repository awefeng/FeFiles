function myInstanceOf(obj, constructor){
    let proto = constructor.prototype
    let objPro = Object.getPrototypeOf(obj)
    while(true){
        if(!objPro){return false}
        if(objPro === proto){return true}
        objPro = Object.getPrototypeOf(objPro)
    }
    return false
}

let a = []

console.log(myInstanceOf(a, '222'))
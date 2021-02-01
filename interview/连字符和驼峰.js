
// 驼峰转连字符
function toHyphen(str) {
    var hyphenateRE = /([a-z\d])([A-Z])/g
    return str.replace(hyphenateRE, '$1-$2').toLowerCase()
}

// 连字符转驼峰
function toHump(str){
    return str.replace(/-([a-z])/g, val => val[1].toUpperCase())
}

console.log(toHump('as-sdsd-sdsd-9xxx'))
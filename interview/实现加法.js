function add(val1, val2){
    if(val1 === 0){return val2}
    if(val2 === 0){return val1}
    let aval1 = val1 ^ val2
    let aval2 = (val1 & val2) << 1
    return add(aval1, aval2)
}


console.log(add(3,7))

function sub(val1, val2){
    if(val1 === 0){return val2}
    if(val2 === 0){return val1}
    val1 = val1 ^ val2
    val2 = (val1 & val2) << 1
    return sub(val1, val2)
}

console.log(sub(3,7)) 


function add(val1, val2){
    if(va1 === 0){return val2}
    if(va2 === 0){return val1}
    val1 = val1 ^ val2
    val2 = (val1 & val2) << 1
    return add(nVal1, nval2)
}
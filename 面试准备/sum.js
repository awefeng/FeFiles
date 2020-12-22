const add = (...args) => {
    return args.reduce((a, b)=> a+b)
}

function sum(...args){
    function temp(...tempArgs){
        return sum(add(...args) + add(...tempArgs))
    }
    
    temp.toString = ()=> add(...args)
    
    return temp
}

console.log(sum(1,2,3,4,5)(1,2)(1)) //19
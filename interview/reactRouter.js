const single = (function (){
    let instantce
    return function(className, args){
        if(instantce){
            return instantce
        }else{
            instantce = new className(...args)
            return instantce
        }
        
    }
})()

class Stu{
    constructor(name){
        this.name = name
    }
}


const student = single(Stu, 'awefeng')

console.log(student)

const s2 = single(Stu, 'xxx')

console.log(student === s2)

if(!String.prototype.reverseSplit){
    String.prototype.reverseSplit = function(tag){
        let arr = this.split('')
        return arr.reverse().join(tag)
    }
}

console.log('awefeng'.reverseSplit('|'))


// 对象去重再返回要的字段
const users = [
    { id: 1, name: "a" },
    { id: 2, name: "a" },
    { id: 3, name: "b" },
    { id: 4, name: "v" }
]
Array.prototype.unique = function() {
    let arr = this
    let result = []
    let index = 0
    while(index < arr.length){
        if(result.includes(arr[index].name)){
            arr.splice(index, 1)
        }else{
            result.push(arr[index].name)
            index++
        }
    }
    return result
}

console.log(users.unique())
console.log(users)
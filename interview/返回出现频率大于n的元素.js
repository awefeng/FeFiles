if(!Array.prototype.findDuplicate){
    Array.prototype.findDuplicate = function(times){
        // 第一种
        // let arr = this
        // let result = []
        // for (let index in arr){
        //     let temp = arr.filter(item => item === arr[index])
        //     if(temp && temp.length >= times){
        //         result.push(arr[index])
        //     }
        // }
        // return [...new Set(result)]
        // 第二种
        return [...new Set(this.filter(x => this.filter(y => x === y).length >= times))]
    }
}

let axrr = [1,2,1,2,1,2,1,2,11,1,2,3,1]

console.log(Object.prototype.toString.call(axrr))




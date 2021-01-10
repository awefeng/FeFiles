Array.prototype.mySort = Array.prototype.mySort || function(){
    // 一些边界检查
    let arr = this
    for(let i = 0; i < arr.length; i++){
        for(let j= i + 1; j< arr.length; j++){
            if(arr[i] > arr[j]){
                let temp = arr[i]
                arr[i] = arr[j]
                arr[j] = temp
            }
        }
    }
}

let aee = [12,2,3,22,1]
aee.mySort()
console.log(aee)

// v 每件物品的价值组成的数组
// w 每件物品的重量组成的数组
// t 背包总重量
// v.length  === w.length === 物品数量
function package(v, w, t){
    let arr = new Array(v.length)
    for(let i = 0; i< arr.length; i++){
        arr[i] = new Array(t)
    }
    // arr[i][j] 代表放入i物品后 背包重量最大为j时的最大价s值
    // 因此 arr[i][j] = Math.max(arr[i-1][j], arr[i-1][j-w[i]] + v[i])
    for(let i = 0; i<arr.length; i++){
        for(let j = 0; j <= t; j++){
            if(j < w[i]){
                // 放不了该物品的时候
                i === 0 ? arr[i][j] = 0 : arr[i][j] = arr[i-1][j]
            }else{
                i === 0 ? arr[i][j] = v[i] : arr[i][j] = Math.max(arr[i-1][j], arr[i-1][j-w[i]] + v[i])
            }
        }
    }
    return arr[arr.length - 1][t]
}

let v = [1,2,4,3,4]
let w = [1,1,2,3,4]

console.log(package(v, w, 4))
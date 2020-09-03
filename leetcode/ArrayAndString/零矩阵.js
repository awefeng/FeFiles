//方法1 先两次遍历找出所有0的横纵坐标 然后坐标进行去重 最后进行赋值

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
    let xset = new Set()
    let yset = new Set()
    matrix.forEach((i, i1) =>{
        i.forEach((j, j1) => {
            if(j === 0){
                xset.add(i1)
                yset.add(j1)
            }
        })
    })
    xset.forEach(index=> {
        for(let i=0;i<matrix[index].length; i++){
            matrix[index][i] = 0
        }
    })
    yset.forEach(index=> {
        for(let i=0;i<matrix.length; i++){
            matrix[i][index] = 0
        }
    })
};

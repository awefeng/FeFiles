/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var findDiagonalOrder = function(matrix) {
    let m = matrix[0].length, n =matrix.length, result =[]
    
    // 对角线的x + y  = 遍历到了第几折
    // 1.计算出总的对脚线条数
    const lines = m+n-1  // 2*(n-1) + (m-n)+1
    // 2.计算填入值
    let line = 0
    while(line < lines){
        if(line < n-1){
            for(let x = 0;x<line;x++){
                line%2===0 ? result.push(matrix[x][line-x]): result.push(matrix[line-x][x])
            }
        }else if(line > m-1){
            for(let x=line-n+1;x<m;x++){
                line%2 ===0 ? result.push(matrix[x][line-x]) : result.push(matrix[m-x][line-m+x])
            }
        }else{
            //debug
        }
        line++s
    }
    return result
};












console.log(findDiagonalOrder([[1,2,3],[4,5,6],[7,8,9]]))
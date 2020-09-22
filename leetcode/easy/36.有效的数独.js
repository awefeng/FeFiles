/*
 * @lc app=leetcode.cn id=36 lang=javascript
 *
 * [36] 有效的数独
 */

// @lc code=start
function isValidArr(arr){
    const set = new Set()
    let index = 0
    while(index < arr.length){
        if(set.has(arr[index])){
            return false
        }
        arr[index] !== '.' && set.add(arr[index])
        index++
    }
    return true
}
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    let index = 0
    while(index < board.length){
        const row = board[index]
        const column = board.map(item => item[index])
        if(!isValidArr(row) || !isValidArr(column)){
            return false
        }
        const square = []
        const xMin = (index % 3 )*3 , xMax = xMin+2
        const yMin =  Math.floor(index/3)*3, yMax = yMin + 2
        for(let x = xMin;x<=xMax;x++){
            for(let y = yMin;y<=yMax;y++){
                square.push(board[x][y])
            }
        }
        if(!isValidArr(square)){
            return false
        }
        index++
    }
    
    return true
};
// @lc code=end

console.log(isValidSudoku([[".",".","5",".",".",".",".",".","6"],[".",".",".",".","1","4",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".","9","2",".","."],["5",".",".",".",".","2",".",".","."],[".",".",".",".",".",".",".","3","."],[".",".",".","5","4",".",".",".","."],["3",".",".",".",".",".","4","2","."],[".",".",".","2","7",".","6",".","."]]))

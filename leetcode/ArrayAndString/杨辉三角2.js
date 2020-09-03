/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function(rowIndex) {
    let result = [],row = 1
    while(row <= rowIndex+1){
        let mid = Math.floor((row-1)/2),rowArr = new Array(row)
        rowArr[0] = 1
        rowArr[rowArr.length -1] = 1
        for(let i=1; i<=mid; i++){
            rowArr[i] = result[row-2][i-1] + result[row-2][i]
            rowArr[row-1-i] =result[row-2][i-1] + result[row-2][i]
        }
        result.push(rowArr)
        row++
    }
    return result[rowIndex]
};

console.log(JSON.stringify(getRow(3)))
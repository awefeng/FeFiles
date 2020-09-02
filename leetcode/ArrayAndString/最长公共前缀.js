/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    let prex =""
    if(strs.length === 0) return prex
    let minStr = strs[0]
    strs.forEach(str =>{
        if(str.length < minStr.length) minStr = str
    })
    let end = 0
    while(end <= minStr.length){
        let temp = minStr.substring(0, end)
        if(strs.every(str => str.startsWith(temp))){
            prex = temp
            end++
        }else{
            break
        }
    }

    return prex
};

console.log(longestCommonPrefix(["flower","flow","flight"]))
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    const len = s.length
    let i = 0, j = len -1
    while(i<=j){
        [s[i], s[j]] = [s[j], s[i]]
        i++
        j--
    }
};
const s = []
reverseString(s)
console.log(s)
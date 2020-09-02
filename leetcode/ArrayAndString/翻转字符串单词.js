/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
    const strs = s.trim().split(' ').reverse()
    let result = []
    strs.forEach(str => {
        if(str){
            result.push(str)
        }
    })
    return result.join(' ')
};

console.log(reverseWords('the  sky is    blue'))
/**
 * @param {string} s
 * @return {string}
 */

// 1. 用现有的方法做 2. 双指针
var reverseWords = function(s) {
    const arr = s.split(" ")
    arr.forEach((str,index) => {
        arr[index] = str.split("").reverse().join("")
    })
    return arr.join(" ")
};

console.log(reverseWords("Let's take LeetCode contest"))
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  s = s.split('').reduce((arr, item,) => {
    if(/a-zA-z0-9/.test(item)){
      arr.push(item)
    }
  }, [])
  let start = 0
  let end = s.length - 1
  return s.charCodeAt(start) === s.charCodeAt(end) ? isPalindrome(s.substring(++start, --end)) : false
};

console.log(isPalindrome("A man, a plan, a canal: Panama"))
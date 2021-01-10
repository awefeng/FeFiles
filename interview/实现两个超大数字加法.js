var multiply = function(num1, num2) {
    if(isNaN(num1) || isNaN(num2)) return '' //判断输入是不是数字
    num1 = String(num1)
    num2 = String(num2)
    var len1 = num1.length,
      len2 = num2.length
    var ans = []
    for (var i = len1 - 1; i >= 0; i--) {    //这里倒过来遍历很妙,不需要处理进位了
      for (var j = len2 - 1; j >= 0; j--) {
        var index1 = i + j
        var index2 = i + j + 1
        var mul = num1[i] * num2[j] + (ans[index2] || 0)
        ans[index1] = Math.floor(mul / 10) + (ans[index1] || 0)
        ans[index2] = mul % 10
      }
    }
    var result = ans.join('')
      //这里结果有可能会是多个零的情况，需要转成数字判断
      //原来写的是return +result === 0 ? '0' : result，result字符串会出现有前置0的情况，感谢评论区小伙伴@nicknice的提醒让我找到了这个错误
      return +result === 0 ? '0' : result.replace(/^0+/,'')
  
  }
console.log(multiply(23909080089709873508234, 1))
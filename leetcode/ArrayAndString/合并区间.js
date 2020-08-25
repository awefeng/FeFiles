/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
// 左或者右范围排序后 比较当前区间与下一个区间是否有交集
var merge = function(intervals) {
  const sortI = intervals.sort((a, b) => a[0] - b[0])
  let tmp = sortI[0], res = []
  for(let i =0; i< sortI.length; i++){
    if(sortI[i][0] <= tmp[1]){
      tmp = [tmp[0], Math.max(sortI[i][1], tmp[1])]
      res[res.length === 0 ? 0 : res.length -1] = tmp
    }else{
      res.push(sortI[i])
      tmp = sortI[i]
    }
  }
  return res
}
/*
// 递归: 每次循环找出当前intervals合并一次后的区间 直到res中没有交集
var merge = function(intervals) {
  let res = []
  for(let i = 0; i<intervals.length;i++){
    let index = res.findIndex(r => !(intervals[i][0] > r[1] || intervals[i][1] < r[0]) )
    if(index > -1){
      res[index] = [Math.min(intervals[i][0], res[index][0]), Math.max(intervals[i][1], res[index][1])]
      res = merge(res)
    }else{
      res.push(intervals[i])
    }
  }
  return res
}
*/

console.log(merge([[1,3],[2,6],[8,10],[15,18]]))
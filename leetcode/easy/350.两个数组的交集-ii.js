/*
 * @lc app=leetcode.cn id=350 lang=javascript
 *
 * [350] 两个数组的交集 II
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    let map = new Map()
    let result = []
    for(let i =0;i< nums1.length;i++){
        const mapI = map.get(nums1[i])
        if(mapI){map.set(nums1[i], mapI+1)}else{map.set(nums1[i], 1)}
    }
    for(let j=0;j<nums2.length;j++){
        const mapJ = map.get(nums2[j])
        if(mapJ){
            map.set(nums2[j], mapJ -1)
            result.push(nums2[j])
        }
    }
    return result
};
// @lc code=end


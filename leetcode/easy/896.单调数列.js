/*
 * @lc app=leetcode.cn id=896 lang=javascript
 *
 * [896] 单调数列
 */

// @lc code=start
/**
 * @param {number[]} A
 * @return {boolean}
 */
var isMonotonic = function(A) {
    let tag = false
    for(let i =0; i < A.length-1;i++){
        if(A[i+1] > A[i]){
            tag = true
            break
        }
        if(A[i+1] < A[i]){
            tag = false
            break
        }
    }
    if(tag){
        for(let i =1;i<A.length-1;i++){    
            if(A[i]<= A[i+1]){
                continue
            }else{
                return false
            }
   
        }
    }else{
        for(let i =1;i<A.length-1;i++){    
            if(A[i]>= A[i+1]){
                continue
            }else{
                return false
            }
   
        }
    }
    return true
};
// @lc code=end

isMonotonic([1, 1, 0])
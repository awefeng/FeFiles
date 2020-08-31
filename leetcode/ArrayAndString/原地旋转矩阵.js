
// 原地旋转则不能引用其他空间 并且必须旋转后对应元素正确ß

// 方法1 对一个number[i][j]的元素进行旋转后的位置推导
// 方法2 先水平对折 再左上到右下的斜线对折 线性代数

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    const n = matrix.length;
    let count = (n / 2) | 0;
    for (let i = 0; i < count; i++) {
        for (let j = 0; j < n; j++) {
            let tmp = matrix[i][j];
            matrix[i][j] = matrix[n-i-1][j];
            matrix[n-i-1][j] = tmp;
        }
    }

    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            let tmp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = tmp;
        }
    }
};
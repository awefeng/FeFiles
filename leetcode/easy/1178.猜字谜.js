/*
 * @lc app=leetcode.cn id=1178 lang=javascript
 *
 * [1178] 猜字谜
 */

// @lc code=start
/**
 * @param {string[]} words
 * @param {string[]} puzzles
 * @return {number[]}
 */
var findNumOfValidWords = function (words, puzzles) {
    const map = {}; // 存放所有单词对应的二进制数
    for (const word of words) { // 遍历单词表
        const bit = getBit(word); // 单词对应的二进制数
        if (map[bit] === undefined) { // 存入map，统计出现次数
            map[bit] = 1;
        } else {
            map[bit]++;
        }
    }
    const res = new Array(puzzles.length).fill(0); // 待返回的数组，所有puzzle的谜底数量
    for (let i = 0; i < puzzles.length; i++) { // 遍历谜语
        const puzzleBit = getBit(puzzles[i]); // 当前谜语的二进制数
        const first = getBit(puzzles[i][0]); // 谜语的第一个字符对应的二进制数，比如c就是100

        let n = puzzleBit; // n初始为puzzleBit这个组合
        while (n > 0) { // 遍历puzzle的所有字母组合，当n=0时终止遍历
            // 按位都是1才为1，否则为0，即n这个组合包含puzzle的首字母
            // 而且n这个组合在map中有值，即有单词长n这样，值累加给res[i]
            if ((n & first) != 0 && map[n] > 0) {
                res[i] += map[n];
            }
            // n-1 AND puzzleBit，生成一个puzzleBit的新的子集合
            n = (n - 1) & puzzleBit;
        }
    }
    return res;
};
// word转成用二进制数表示的字符集合
function getBit(word) {
    let res = 0;
    for (const c of word) {
        const offset = c.charCodeAt(0) - 97; // a在最低位，求出当前字符的偏移位
        const status = 1 << offset; // 将二进制的1左移offset位，右边用0填充
        res = res | status; // 按位或，该位至少有一个1时，才为1（出现过），否则为0
    }
    return res;
}

// @lc code=end


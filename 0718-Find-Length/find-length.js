// 718. 最长重复子数组
//给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度。

//示例 1:

//输入:
//A: [1,2,3,2,1]
//B: [3,2,1,4,7]
//输出: 3
//解释: 
//长度最长的公共子数组是 [3, 2, 1]。
//说明:

//1, 1 <= len(A), len(B) <= 1000
//2, 0 <= A[i], B[i] < 100

var findLengthen = function(A, B) {
    const m = A.length;
    const n = B.length;
    const dp = new Array(m + 1);
    // 初始化二维数组dp，每一项都是0
    for (let i = 0; i <= m; i++) {
        dp[i] = new Array(n + 1).fill(0)
    }
    let res = 0;
    for(let i = 1; i <= m; i++) {
        for(let j = 1; j <= n; j++) {
            if (A[i - 1] == B[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            }
            res = Math.max(dp[i][j], res)
        }
    }
    return res;
}

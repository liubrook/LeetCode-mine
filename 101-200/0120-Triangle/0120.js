// 120. 三角形最小路径和
// 给定一个三角形，找出自顶向下的最小路径和。每一步只能移动到下一行中相邻的结点上。

// 相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。

 

// 例如，给定三角形：

// [
//      [2],
//     [3,4],
//    [6,5,7],
//   [4,1,8,3]
// ]
// 自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。

// 解法一：动态规划-自底向上
var minimumTotal = function(triangle) {
    for(let i = triangle.length - 2; i >= 0; i--) {
        for(let j = 0; j < triangle[i].length; j++) {
            triangle[i][j] = Math.min(triangle[i + 1][j], triangle[i + 1][j + 1]) + triangle[i][j];
        }
    }
    return triangle[0][0]
}

// 解法二：动态规划-自底向上-降维
var minimumTotal2 = function(triangle) {
    var dp = new Array(triangle.length + 1).fill(0);
    for(let i = triangle.length - 1; i >= 0; i--) {
        for(let j = 0; j < triangle[i].length; j++) {
            dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j];
        }
    }
    return dp[0];
}
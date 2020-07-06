// 63. 不同路径 II
// 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。

// 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。

// 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？



// 网格中的障碍物和空位置分别用 1 和 0 来表示。

// 说明：m 和 n 的值均不超过 100。

// 示例 1:

// 输入:
// [
//   [0,0,0],
//   [0,1,0],
//   [0,0,0]
// ]
// 输出: 2
// 解释:
// 3x3 网格的正中间有一个障碍物。
// 从左上角到右下角一共有 2 条不同的路径：
// 1. 向右 -> 向右 -> 向下 -> 向下
// 2. 向下 -> 向下 -> 向右 -> 向右

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
    // 行
    var n = obstacleGrid.length
    // 列
    var m = obstacleGrid[0].length;
    // 初始化
    var dp = new Array(n);
    for(let i = 0; i < n; i++) {
        dp[i] = new Array(m).fill(0);
    }
    dp[0][0] = obstacleGrid[0][0] == 0 ? 1 : 0;
    // 如果七点就是障碍物
    if (dp[0][0] == 0) {
        return 0;
    }
    // 第一行
    for(let j = 1;j < m; j++) {
        if (obstacleGrid[0][j] != 1) {
            dp[0][j] = dp[0][j - 1];
        }
    }
    // 第一列
    for(let r = 1; r < n; r++) {
        if(obstacleGrid[r][0] != 1) {
            dp[r][0] = dp[r - 1][0]
        }
    }
    // 动态递推
    for(let i = 1; i < n; i++) {
        for(let r = 1; r < m; r++) {
            if(obstacleGrid[i][r] != 1) {
                dp[i][r] = dp[i - 1][r] + dp[i][r - 1]
            }
        }
    }
    return dp[n - 1][m - 1]
};
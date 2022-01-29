// 1765. 地图中的最高点
// 给你一个大小为 m x n 的整数矩阵 isWater ，它代表了一个由 陆地 和 水域 单元格组成的地图。

// 如果 isWater[i][j] == 0 ，格子(i, j) 是一个 陆地 格子。
// 如果 isWater[i][j] == 1 ，格子(i, j) 是一个 水域 格子。
// 你需要按照如下规则给每个单元格安排高度：

// 每个格子的高度都必须是非负的。
// 如果一个格子是是 水域 ，那么它的高度必须为 0 。
// 任意相邻的格子高度差 至多 为 1 。当两个格子在正东、南、西、北方向上相互紧挨着，就称它们为相邻的格子。（也就是说它们有一条公共边）
// 找到一种安排高度的方案，使得矩阵中的最高高度值 最大 。

// 请你返回一个大小为 m x n 的整数矩阵 height ，其中 height[i][j] 是格子(i, j) 的高度。如果有多种解法，请返回 任意一个 。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/01/10/screenshot-2021-01-11-at-82045-am.png

// 输入：isWater = [[0, 1], [0, 0]]
// 输出：[[1, 0], [2, 1]]
// 解释：上图展示了给各个格子安排的高度。
// 蓝色格子是水域格，绿色格子是陆地格。
// 示例 2：

// https://assets.leetcode.com/uploads/2021/01/10/screenshot-2021-01-11-at-82050-am.png

// 输入：isWater = [[0, 0, 1], [1, 0, 0], [0, 0, 0]]
// 输出：[[1, 1, 0], [0, 1, 1], [1, 2, 2]]
// 解释：所有安排方案中，最高可行高度为 2 。
// 任意安排方案中，只要最高高度为 2 且符合上述规则的，都为可行方案。


// 提示：

// m == isWater.length
// n == isWater[i].length
// 1 <= m, n <= 1000
// isWater[i][j] 要么是 0 ，要么是 1 。
// 至少有 1 个水域格子。

/**
 * @param {number[][]} isWater
 * @return {number[][]}
 */
const points = [0, -1, 0, 1, 0];
var highestPeak = function (isWater) {
  const n = isWater.length;
  const m = isWater[0].length;
  //第一步: 记录所有水域的坐标,(有2个作用, 1.从当前点出发,2.最后把水域坐标值变为0);
  let queue = [];
  const temp = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (isWater[i][j] === 1) {
        queue.push([i, j]);
        temp.push([i, j]);
      }
    }
  }
  let len, step = 0;
  while (len = queue.length) {
    //第二步: 改变以往shift 方式获取最前面的值 因为会超时; 用一个新数组newQueue 装后一轮的坐标;
    const newQueue = [];
    step++;
    for (let k = 0; k < len; k++) {
      const [i, j] = queue[k];
      for (let x = 0; x <= 3; x++) {
        //第三步: 从当前点往四周走一步,如果新坐标在范围内,且还没人走过.那当前坐标值就为走的步数;然后把新坐标入队;
        const [newI, newJ] = [i + points[x], j + points[x + 1]];
        if (newI < 0 || newJ < 0 || newI >= n || newJ >= m || isWater[newI][newJ] > 0) continue;
        isWater[newI][newJ] = step;
        newQueue.push([newI, newJ]);
      }
    }
    queue = newQueue;  // 新队列 取代旧队列
  }
  for (const [i, j] of temp) {  //最后把记录的水域坐标值变为0
    isWater[i][j] = 0;
  }

  return isWater;
};
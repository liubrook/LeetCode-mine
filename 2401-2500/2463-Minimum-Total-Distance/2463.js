// 2463. 最小移动总距离
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// X 轴上有一些机器人和工厂。给你一个整数数组 robot ，其中 robot[i] 是第 i 个机器人的位置。再给你一个二维整数数组 factory ，其中 factory[j] = [positionj, limitj] ，表示第 j 个工厂的位置在 positionj ，且第 j 个工厂最多可以修理 limitj 个机器人。

// 每个机器人所在的位置 互不相同 。每个工厂所在的位置也 互不相同 。注意一个机器人可能一开始跟一个工厂在 相同的位置 。

// 所有机器人一开始都是坏的，他们会沿着设定的方向一直移动。设定的方向要么是 X 轴的正方向，要么是 X 轴的负方向。当一个机器人经过一个没达到上限的工厂时，这个工厂会维修这个机器人，且机器人停止移动。

// 任何时刻，你都可以设置 部分 机器人的移动方向。你的目标是最小化所有机器人总的移动距离。

// 请你返回所有机器人移动的最小总距离。测试数据保证所有机器人都可以被维修。

// 注意：

// 所有机器人移动速度相同。
// 如果两个机器人移动方向相同，它们永远不会碰撞。
// 如果两个机器人迎面相遇，它们也不会碰撞，它们彼此之间会擦肩而过。
// 如果一个机器人经过了一个已经达到上限的工厂，机器人会当作工厂不存在，继续移动。
// 机器人从位置 x 到位置 y 的移动距离为 |y - x| 。

// 示例 1：

// https://pic.leetcode.cn/1667542978-utuiPv-image.png

// 输入：robot = [0,4,6], factory = [[2,2],[6,2]]
// 输出：4
// 解释：如上图所示：
// - 第一个机器人从位置 0 沿着正方向移动，在第一个工厂处维修。
// - 第二个机器人从位置 4 沿着负方向移动，在第一个工厂处维修。
// - 第三个机器人在位置 6 被第二个工厂维修，它不需要移动。
// 第一个工厂的维修上限是 2 ，它维修了 2 个机器人。
// 第二个工厂的维修上限是 2 ，它维修了 1 个机器人。
// 总移动距离是 |2 - 0| + |2 - 4| + |6 - 6| = 4 。没有办法得到比 4 更少的总移动距离。
// 示例 2：

// https://pic.leetcode.cn/1667542984-OAIRFN-image.png

// 输入：robot = [1,-1], factory = [[-2,1],[2,1]]
// 输出：2
// 解释：如上图所示：
// - 第一个机器人从位置 1 沿着正方向移动，在第二个工厂处维修。
// - 第二个机器人在位置 -1 沿着负方向移动，在第一个工厂处维修。
// 第一个工厂的维修上限是 1 ，它维修了 1 个机器人。
// 第二个工厂的维修上限是 1 ，它维修了 1 个机器人。
// 总移动距离是 |2 - 1| + |(-2) - (-1)| = 2 。没有办法得到比 2 更少的总移动距离。

// 提示：

// 1 <= robot.length, factory.length <= 100
// factory[j].length == 2
// -10^9 <= robot[i], positionj <= 10^9
// 0 <= limitj <= robot.length
// 测试数据保证所有机器人都可以被维修。
/**
 * @param {number[]} robot
 * @param {number[][]} factory
 * @return {number}
 */
var minimumTotalDistance = function (robot, factory) {
  robot.sort((a, b) => a - b);
  factory.sort((a, b) => a[0] - b[0]);
  const n = robot.length,
    m = factory.length;
  const dp = Array.from({ length: n + 1 }, () =>
    Array(m + 1).fill(Number.MAX_SAFE_INTEGER / 2),
  );
  for (let j = 0; j <= m; j++) {
    dp[0][j] = 0;
  }
  for (let j = 1; j <= m; j++) {
    for (let i = 1; i <= n; i++) {
      dp[i][j] = dp[i][j - 1];
      let cost = 0;
      for (let k = 1; k <= Math.min(i, factory[j - 1][1]); k++) {
        cost += Math.abs(robot[i - k] - factory[j - 1][0]);
        dp[i][j] = Math.min(dp[i][j], dp[i - k][j - 1] + cost);
      }
    }
  }
  return dp[n][m];
};

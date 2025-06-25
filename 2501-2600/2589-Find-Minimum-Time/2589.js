// 2589. 完成所有任务的最少时间
// 困难
// 相关标签
// 相关企业
// 提示
// 你有一台电脑，它可以 同时 运行无数个任务。给你一个二维整数数组 tasks ，其中 tasks[i] = [starti, endi, durationi] 表示第 i 个任务需要在 闭区间 时间段[starti, endi] 内运行 durationi 个整数时间点（但不需要连续）。

// 当电脑需要运行任务时，你可以打开电脑，如果空闲时，你可以将电脑关闭。

// 请你返回完成所有任务的情况下，电脑最少需要运行多少秒。



// 示例 1：

// 输入：tasks = [[2, 3, 1], [4, 5, 1], [1, 5, 2]]
// 输出：2
// 解释：
// - 第一个任务在闭区间[2, 2] 运行。
// - 第二个任务在闭区间[5, 5] 运行。
// - 第三个任务在闭区间[2, 2] 和[5, 5] 运行。
// 电脑总共运行 2 个整数时间点。
// 示例 2：

// 输入：tasks = [[1, 3, 2], [2, 5, 3], [5, 6, 2]]
// 输出：4
// 解释：
// - 第一个任务在闭区间[2, 3] 运行
//   - 第二个任务在闭区间[2, 3] 和[5, 5] 运行。
// - 第三个任务在闭区间[5, 6] 运行。
// 电脑总共运行 4 个整数时间点。


// 提示：

// 1 <= tasks.length <= 2000
// tasks[i].length == 3
// 1 <= starti, endi <= 2000
// 1 <= durationi <= endi - starti + 1 


/**
 * @param {number[][]} tasks
 * @return {number}
 */
var findMinimumTime = function (tasks) {
  const n = tasks.length;
  tasks.sort((t1, t2) => t1[1] - t2[1]);
  const run = new Array(tasks[n - 1][1] + 1).fill(0);
  let res = 0;
  for (let i = 0; i < n; i++) {
    let start = tasks[i][0], end = tasks[i][1], duration = tasks[i][2];
    duration -= run.slice(start, end + 1).reduce((acc, val) => acc + val, 0);
    res += Math.max(duration, 0);
    for (let j = end; j >= start && duration > 0; j--) {
      if (run[j] === 0) {
        duration--;
        run[j] = 1;
      }
    }
  }
  return res;
};
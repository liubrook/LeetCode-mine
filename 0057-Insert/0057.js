// 57. 插入区间
// 中等
// 789
// 相关企业
// 给你一个 无重叠的 ，按照区间起始端点排序的区间列表。

// 在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。



// 示例 1：

// 输入：intervals = [[1, 3], [6, 9]], newInterval = [2, 5]
// 输出：[[1, 5], [6, 9]]
// 示例 2：

// 输入：intervals = [[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], newInterval = [4, 8]
// 输出：[[1, 2], [3, 10], [12, 16]]
// 解释：这是因为新的区间[4, 8] 与[3, 5], [6, 7], [8, 10] 重叠。
// 示例 3：

// 输入：intervals = [], newInterval = [5, 7]
// 输出：[[5, 7]]
// 示例 4：

// 输入：intervals = [[1, 5]], newInterval = [2, 3]
// 输出：[[1, 5]]
// 示例 5：

// 输入：intervals = [[1, 5]], newInterval = [2, 7]
// 输出：[[1, 7]]


// 提示：

// 0 <= intervals.length <= 10^4
// intervals[i].length == 2
// 0 <= intervals[i][0] <= intervals[i][1] <= 10^5
// intervals 根据 intervals[i][0] 按 升序 排列
// newInterval.length == 2
// 0 <= newInterval[0] <= newInterval[1] <= 10^5

/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
var insert = function (intervals, newInterval) {
  const res = [];
  let i = 0;
  const len = intervals.length;

  while (i < len && intervals[i][1] < newInterval[0]) {
    // 当前遍历的是蓝左边的，不重叠的区间
    res.push(intervals[i]);
    i++;
  }

  while (i < len && intervals[i][0] <= newInterval[1]) {
    // 当前遍历是有重叠的区间
    // 左端取较小者，更新给蓝区间的左端
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    // 右端取较大者，更新给蓝区间的右端
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  res.push(newInterval); // 循环结束后，蓝区间为合并后的区间，推入res

  while (i < len) {
    // 在蓝右边，没重叠的区间
    res.push(intervals[i]);
    i++;
  }

  return res;
};
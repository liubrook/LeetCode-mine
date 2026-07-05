// 1288. 删除被覆盖区间
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个区间列表，请你删除列表中被其他区间所覆盖的区间。

// 只有当 c <= a 且 b <= d 时，我们才认为区间 [a,b) 被区间 [c,d) 覆盖。

// 在完成所有删除操作后，请你返回列表中剩余区间的数目。

// 示例：

// 输入：intervals = [[1,4],[3,6],[2,8]]
// 输出：2
// 解释：区间 [3,6] 被区间 [2,8] 覆盖，所以它被删除了。

// 提示：​​​​​​

// 1 <= intervals.length <= 1000
// 0 <= intervals[i][0] < intervals[i][1] <= 10^5
// 对于所有的 i != j：intervals[i] != intervals[j]
/**
 * @param {number[][]} intervals
 * @return {number}
 */
var removeCoveredIntervals = function (intervals) {
  // 按区间左端点从小到大排序
  // 区间左端点相同时，按区间右端点从大到小排序，这样会先遍历大区间，再遍历被大区间覆盖的小区间
  intervals.sort((a, b) => a[0] - b[0] || b[1] - a[1]);

  let ans = 0;
  let maxRight = 0; // 已遍历区间中的最大右端点
  for (const [_, r] of intervals) {
    // 由于区间左端点是从小到大排序的，已遍历区间的左端点都 <= 当前区间的左端点
    // 如果当前区间右端点 <= maxRight, 说明当前区间被另一个区间覆盖，否则没被覆盖
    if (r > maxRight) {
      maxRight = r;
      ans++; // 当前区间没被覆盖
    }
  }
  return ans;
};

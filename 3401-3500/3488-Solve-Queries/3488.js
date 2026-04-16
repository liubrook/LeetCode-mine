// 3488. 距离最小相等元素查询
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个 环形 数组 nums 和一个数组 queries 。

// 对于每个查询 i ，你需要找到以下内容：

// 数组 nums 中下标 queries[i] 处的元素与 任意 其他下标 j（满足 nums[j] == nums[queries[i]]）之间的 最小 距离。如果不存在这样的下标 j，则该查询的结果为 -1 。
// 返回一个数组 answer，其大小与 queries 相同，其中 answer[i] 表示查询i的结果。

// 示例 1：

// 输入： nums = [1,3,1,4,1,3,2], queries = [0,3,5]

// 输出： [2,-1,3]

// 解释：

// 查询 0：下标 queries[0] = 0 处的元素为 nums[0] = 1 。最近的相同值下标为 2，距离为 2。
// 查询 1：下标 queries[1] = 3 处的元素为 nums[3] = 4 。不存在其他包含值 4 的下标，因此结果为 -1。
// 查询 2：下标 queries[2] = 5 处的元素为 nums[5] = 3 。最近的相同值下标为 1，距离为 3（沿着循环路径：5 -> 6 -> 0 -> 1）。
// 示例 2：

// 输入： nums = [1,2,3,4], queries = [0,1,2,3]

// 输出： [-1,-1,-1,-1]

// 解释：

// 数组 nums 中的每个值都是唯一的，因此没有下标与查询的元素值相同。所有查询的结果均为 -1。

// 提示：

// 1 <= queries.length <= nums.length <= 10^5
// 1 <= nums[i] <= 10^6
// 0 <= queries[i] < nums.length
/**
 * @param {number[]} nums
 * @param {number[]} queries
 * @return {number[]}
 */
var solveQueries = function (nums, queries) {
  const n = nums.length;
  const numsPos = new Map();

  for (let i = 0; i < n; i++) {
    if (!numsPos.has(nums[i])) {
      numsPos.set(nums[i], []);
    }
    numsPos.get(nums[i]).push(i);
  }

  for (const [key, pos] of numsPos) {
    const x = pos[0];
    pos.unshift(pos[pos.length - 1] - n);
    pos.push(x + n);
  }

  for (let i = 0; i < queries.length; i++) {
    const x = nums[queries[i]];
    const posList = numsPos.get(x);
    if (posList.length === 3) {
      queries[i] = -1;
      continue;
    }
    const pos = binarySearch(posList, queries[i]);
    queries[i] = Math.min(
      posList[pos + 1] - posList[pos],
      posList[pos] - posList[pos - 1],
    );
  }

  return queries;
};

function binarySearch(arr, target) {
  let left = 0,
    right = arr.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}

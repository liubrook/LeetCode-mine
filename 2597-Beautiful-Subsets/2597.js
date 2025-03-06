// 2597. 美丽子集的数目
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个由正整数组成的数组 nums 和一个 正 整数 k 。

// 如果 nums 的子集中，任意两个整数的绝对差均不等于 k ，则认为该子数组是一个 美丽 子集。

// 返回数组 nums 中 非空 且 美丽 的子集数目。

// nums 的子集定义为：可以经由 nums 删除某些元素（也可能不删除）得到的一个数组。只有在删除元素时选择的索引不同的情况下，两个子集才会被视作是不同的子集。



// 示例 1：

// 输入：nums = [2, 4, 6], k = 2
// 输出：4
// 解释：数组 nums 中的美丽子集有：[2], [4], [6], [2, 6] 。
// 可以证明数组[2, 4, 6] 中只存在 4 个美丽子集。
// 示例 2：

// 输入：nums = [1], k = 1
// 输出：1
// 解释：数组 nums 中的美丽数组有：[1] 。
// 可以证明数组[1] 中只存在 1 个美丽子集。


// 提示：

// 1 <= nums.length <= 18
// 1 <= nums[i], k <= 1000

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var beautifulSubsets = function (nums, k) {
  const groups = new Map();
  for (const a of nums) {
    const mod = a % k;
    if (!groups.has(mod)) {
      groups.set(mod, new Map());
    }
    const group = groups.get(mod);
    group.set(a, (group.get(a) || 0) + 1);
  }
  let ans = 1;
  for (const g of groups.values()) {
    const sortedKeys = Array.from(g.keys()).sort((a, b) => a - b);
    const m = sortedKeys.length;
    const f = Array.from({ length: m }, () => [0, 0]);
    f[0][0] = 1;
    f[0][1] = (1 << g.get(sortedKeys[0])) - 1;
    for (let i = 1; i < m; i++) {
      f[i][0] = f[i - 1][0] + f[i - 1][1];
      if (sortedKeys[i] - sortedKeys[i - 1] === k) {
        f[i][1] = f[i - 1][0] * ((1 << g.get(sortedKeys[i])) - 1);
      } else {
        f[i][1] = (f[i - 1][0] + f[i - 1][1]) * ((1 << g.get(sortedKeys[i])) - 1);
      }
    }
    ans *= f[m - 1][0] + f[m - 1][1];
  }
  return ans - 1;
};
// 2799. 统计完全子数组的数目
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个由 正 整数组成的数组 nums 。

// 如果数组中的某个子数组满足下述条件，则称之为 完全子数组 ：

// 子数组中 不同 元素的数目等于整个数组不同元素的数目。
// 返回数组中 完全子数组 的数目。

// 子数组 是数组中的一个连续非空序列。



// 示例 1：

// 输入：nums = [1, 3, 1, 2, 2]
// 输出：4
// 解释：完全子数组有：[1, 3, 1, 2]、[1, 3, 1, 2, 2]、[3, 1, 2] 和[3, 1, 2, 2] 。
// 示例 2：

// 输入：nums = [5, 5, 5, 5]
// 输出：10
// 解释：数组仅由整数 5 组成，所以任意子数组都满足完全子数组的条件。子数组的总数为 10 。


// 提示：

// 1 <= nums.length <= 1000
// 1 <= nums[i] <= 2000

/**
 * @param {number[]} nums
 * @return {number}
 */
var countCompleteSubarrays = function (nums) {
  let res = 0;
  let cnt = new Map();
  const n = nums.length;
  let right = 0;
  const distinct = new Set(nums).size;

  for (let left = 0; left < n; left++) {
    if (left > 0) {
      const remove = nums[left - 1];
      cnt.set(remove, cnt.get(remove) - 1);
      if (cnt.get(remove) === 0) {
        cnt.delete(remove);
      }
    }
    while (right < n && cnt.size < distinct) {
      const add = nums[right];
      cnt.set(add, (cnt.get(add) || 0) + 1);
      right++;
    }
    if (cnt.size === distinct) {
      res += (n - right + 1);
    }
  }
  return res;
};
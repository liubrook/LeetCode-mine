// 1437. 是否所有 1 都至少相隔 k 个元素
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个由若干 0 和 1 组成的数组 nums 以及整数 k。如果所有 1 都至少相隔 k 个元素，则返回 true ；否则，返回 false 。

// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/03/sample_1_1791.png

// 输入：nums = [1,0,0,0,1,0,0,1], k = 2
// 输出：true
// 解释：每个 1 都至少相隔 2 个元素。
// 示例 2：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/03/sample_2_1791.png

// 输入：nums = [1,0,0,1,0,1], k = 2
// 输出：false
// 解释：第二个 1 和第三个 1 之间只隔了 1 个元素。

// 提示：

// 1 <= nums.length <= 10^5
// 0 <= k <= nums.length
// nums[i] 的值为 0 或 1
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var kLengthApart = function (nums, k) {
  const n = nums.length;
  let prev = -1;
  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) {
      if (prev !== -1 && i - prev - 1 < k) {
        return false;
      }
      prev = i;
    }
  }
  return true;
};
var kLengthApartByMine = function (nums, k) {
  let first = nums.indexOf(1);
  for (let i = first + 1; i < nums.length; i++) {
    if (nums[i] === 1) {
      if (i - first > k) {
        first = i;
        continue;
      }
      if (i - first <= k) return false;
    }
  }
  return true;
};

const nums = [1, 0, 0, 1, 0, 1];
const k = 2;
console.log(kLengthApart(nums, k));

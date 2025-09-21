// 3005. 最大频率元素计数
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个由 正整数 组成的数组 nums 。

// 返回数组 nums 中所有具有 最大 频率的元素的 总频率 。

// 元素的 频率 是指该元素在数组中出现的次数。



// 示例 1：

// 输入：nums = [1, 2, 2, 3, 1, 4]
// 输出：4
// 解释：元素 1 和 2 的频率为 2 ，是数组中的最大频率。
// 因此具有最大频率的元素在数组中的数量是 4 。
// 示例 2：

// 输入：nums = [1, 2, 3, 4, 5]
// 输出：5
// 解释：数组中的所有元素的频率都为 1 ，是最大频率。
// 因此具有最大频率的元素在数组中的数量是 5 。


// 提示：

// 1 <= nums.length <= 100
// 1 <= nums[i] <= 100

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxFrequencyElements = function (nums) {
  let count = {};
  for (let a of nums) {
    count[a] = (count[a] || 0) + 1;
  }
  let maxf = 0;
  for (let key in count) {
    if (count[key] > maxf) {
      maxf = count[key];
    }
  }
  let res = 0;
  for (let key in count) {
    if (count[key] === maxf) {
      res += maxf;
    }
  }
  return res;
};
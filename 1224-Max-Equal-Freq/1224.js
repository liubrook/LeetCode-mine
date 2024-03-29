// 1224. 最大相等频率
// 给你一个正整数数组 nums，请你帮忙从该数组中找出能满足下面要求的 最长 前缀，并返回该前缀的长度：

// 从前缀中 恰好删除一个 元素后，剩下每个数字的出现次数都相同。
// 如果删除这个元素后没有剩余元素存在，仍可认为每个数字都具有相同的出现次数（也就是 0 次）。



// 示例 1：

// 输入：nums = [2, 2, 1, 1, 5, 3, 3, 5]
// 输出：7
// 解释：对于长度为 7 的子数组[2, 2, 1, 1, 5, 3, 3]，如果我们从中删去 nums[4] = 5，就可以得到[2, 2, 1, 1, 3, 3]，里面每个数字都出现了两次。
// 示例 2：

// 输入：nums = [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4, 5]
// 输出：13


// 提示：

// 2 <= nums.length <= 105
// 1 <= nums[i] <= 105

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxEqualFreq = function (nums) {
  const freq = new Map();
  const count = new Map();
  let res = 0, maxFreq = 0;
  for (let i = 0; i < nums.length; i++) {
    if (!count.has(nums[i])) {
      count.set(nums[i], 0);
    }
    if (count.get(nums[i]) > 0) {
      freq.set(count.get(nums[i]), freq.get(count.get(nums[i])) - 1);
    }
    count.set(nums[i], count.get(nums[i]) + 1);
    maxFreq = Math.max(maxFreq, count.get(nums[i]));
    if (!freq.has(count.get(nums[i]))) {
      freq.set(count.get(nums[i]), 0);
    }
    freq.set(count.get(nums[i]), freq.get(count.get(nums[i])) + 1);
    const ok = maxFreq === 1 ||
      freq.get(maxFreq) * maxFreq + freq.get(maxFreq - 1) * (maxFreq - 1) === i + 1 && freq.get(maxFreq) === 1 ||
      freq.get(maxFreq) * maxFreq + 1 === i + 1 && freq.get(1) === 1;
    if (ok) {
      res = Math.max(res, i + 1);
    }
  }
  return res;
};
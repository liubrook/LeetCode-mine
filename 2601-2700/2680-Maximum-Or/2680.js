// 输入：nums = [8, 1, 2], k = 2
// 输出：35
// 解释：如果我们对下标 0 处的元素进行操作，得到新数组[32, 1, 2] 。此时得到最优答案为 32 | 1 | 2 = 35 。


// 提示：

// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^9
// 1 <= k <= 15

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumOr = function (nums, k) {
  let orSum = 0n, multiBits = 0n;
  for (let x of nums) {
    multiBits |= BigInt(x) & orSum;
    orSum |= BigInt(x);
  }

  let res = 0n;
  for (let x of nums) {
    res = Math.max(Number(res), Number((orSum ^ BigInt(x)) | (BigInt(x) << BigInt(k)) | multiBits));
  }
  return Number(res);
};
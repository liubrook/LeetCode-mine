// 3171. 找到按位或最接近 K 的子数组
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个数组 nums 和一个整数 k 。你需要找到 nums 的一个
// 子数组
//  ，满足子数组中所有元素按位或运算 OR 的值与 k 的 绝对差 尽可能 小 。换言之，你需要选择一个子数组 nums[l..r] 满足 | k - (nums[l] OR nums[l + 1] ... OR nums[r])| 最小。

// 请你返回 最小 的绝对差值。

// 子数组 是数组中连续的 非空 元素序列。



// 示例 1：

// 输入：nums = [1, 2, 4, 5], k = 3

// 输出：0

// 解释：

// 子数组 nums[0..1] 的按位 OR 运算值为 3 ，得到最小差值 | 3 - 3 | = 0 。

// 示例 2：

// 输入：nums = [1, 3, 1, 3], k = 2

// 输出：1

// 解释：

// 子数组 nums[1..1] 的按位 OR 运算值为 3 ，得到最小差值 | 3 - 2 | = 1 。

// 示例 3：

// 输入：nums = [1], k = 10

// 输出：9

// 解释：

// 只有一个子数组，按位 OR 运算值为 1 ，得到最小差值 | 10 - 1 | = 9 。



// 提示：

// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^9
// 1 <= k <= 10^9

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
  const n = nums.length;
  const bitsMaxPos = new Array(31).fill(-1);
  let res = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= 30; j++) {
      if (nums[i] >> j & 1) {
        bitsMaxPos[j] = i;
      }
    }

    const posToBit = [];
    for (let j = 0; j <= 30; j++) {
      if (bitsMaxPos[j] !== -1) {
        posToBit.push([bitsMaxPos[j], j]);
      }
    }

    posToBit.sort((a, b) => b[0] - a[0]);
    let val = 0, j = 0;
    for (let j = 0, p = 0; j < posToBit.length; p = j) {
      while (j < posToBit.length && posToBit[j][0] === posToBit[p][0]) {
        val |= 1 << posToBit[j][1];
        j++;
      }
      res = Math.min(res, Math.abs(val - k));
    }
  }
  return res;
};
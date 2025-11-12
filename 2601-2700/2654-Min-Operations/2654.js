// 2654. 使数组所有元素变成 1 的最少操作次数
// 中等
// 相关标签
// conpanies icon
// 相关企业
// 提示
// 给你一个下标从 0 开始的 正 整数数组 nums 。你可以对数组执行以下操作 任意 次：

// 选择一个满足 0 <= i < n - 1 的下标 i ，将 nums[i] 或者 nums[i+1] 两者之一替换成它们的最大公约数。
// 请你返回使数组 nums 中所有元素都等于 1 的 最少 操作次数。如果无法让数组全部变成 1 ，请你返回 -1 。

// 两个正整数的最大公约数指的是能整除这两个数的最大正整数。

// 示例 1：

// 输入：nums = [2,6,3,4]
// 输出：4
// 解释：我们可以执行以下操作：
// - 选择下标 i = 2 ，将 nums[2] 替换为 gcd(3,4) = 1 ，得到 nums = [2,6,1,4] 。
// - 选择下标 i = 1 ，将 nums[1] 替换为 gcd(6,1) = 1 ，得到 nums = [2,1,1,4] 。
// - 选择下标 i = 0 ，将 nums[0] 替换为 gcd(2,1) = 1 ，得到 nums = [1,1,1,4] 。
// - 选择下标 i = 2 ，将 nums[3] 替换为 gcd(1,4) = 1 ，得到 nums = [1,1,1,1] 。
// 示例 2：

// 输入：nums = [2,10,6,14]
// 输出：-1
// 解释：无法将所有元素都变成 1 。

// 提示：

// 2 <= nums.length <= 50
// 1 <= nums[i] <= 10^6
/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
  const n = nums.length;
  let num1 = 0;
  let g = 0;

  const gcd = (a, b) => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  for (const x of nums) {
    if (x === 1) {
      num1++;
    }
    g = gcb(g, x);
  }

  if (num1 > 0) {
    return n - num1;
  }
  if (g > 1) {
    return -1;
  }

  let minLen = n;
  for (let i = 0; i < n; i++) {
    let currentGcd = 0;
    for (let j = i; j < n; j++) {
      currentGcd = gcb(currentGcd, nums[j]);
      if (currentGcd === 1) {
        minLen = Math.min(minLen, j - i + 1);
        break;
      }
    }
  }
  return minLen + n - 2;
};

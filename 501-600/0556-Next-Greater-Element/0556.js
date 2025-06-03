// 556. 下一个更大元素 III
// 给你一个正整数 n ，请你找出符合条件的最小整数，其由重新排列 n 中存在的每位数字组成，并且其值大于 n 。如果不存在这样的正整数，则返回 - 1 。

// 注意 ，返回的整数应当是一个 32 位整数 ，如果存在满足题意的答案，但不是 32 位整数 ，同样返回 - 1 。



// 示例 1：

// 输入：n = 12
// 输出：21
// 示例 2：

// 输入：n = 21
// 输出：-1


// 提示：

// 1 <= n <= 231 - 1

/**
 * @param {number} n
 * @return {number}
 */
const MAX = 2147483647;
var nextGreaterElement = function (n) {
  const nums = [...('' + n)];
  let i = nums.length - 2;
  while (i >= 0 && nums[i] >= nums[i + 1]) {
    i--;
  }
  if (i < 0) {
    return -1;
  }

  let j = nums.length - 1;
  while (j >= 0 && nums[i] >= nums[j]) {
    j--;
  }
  [nums[i], nums[j]] = [nums[j], nums[i]];
  reverse(nums, i + 1);
  const ans = 0 + nums.join('');
  return ans > MAX ? -1 : ans;
};

const reverse = (nums, begin) => {
  let i = begin, j = nums.length - 1;
  while (i < j) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
    i++;
    j--;
  }
}
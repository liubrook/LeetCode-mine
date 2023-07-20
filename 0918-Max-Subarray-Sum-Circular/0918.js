// 918. 环形子数组的最大和
// 给定一个长度为 n 的环形整数数组 nums ，返回 nums 的非空 子数组 的最大可能和 。

// 环形数组 意味着数组的末端将会与开头相连呈环状。形式上， nums[i] 的下一个元素是 nums[(i + 1) % n] ， nums[i] 的前一个元素是 nums[(i - 1 + n) % n] 。

// 子数组 最多只能包含固定缓冲区 nums 中的每个元素一次。形式上，对于子数组 nums[i], nums[i + 1], ..., nums[j] ，不存在 i <= k1, k2 <= j 其中 k1 % n == k2 % n 。



// 示例 1：

// 输入：nums = [1, -2, 3, -2]
// 输出：3
// 解释：从子数组[3] 得到最大和 3
// 示例 2：

// 输入：nums = [5, -3, 5]
// 输出：10
// 解释：从子数组[5, 5] 得到最大和 5 + 5 = 10
// 示例 3：

// 输入：nums = [3, -2, 2, -3]
// 输出：3
// 解释：从子数组[3] 和[3, -2, 2] 都可以得到最大和 3


// 提示：

// n == nums.length
// 1 <= n <= 3 * 10^4
//   - 3 * 10^4 <= nums[i] <= 3 * 10^4​​​​​​​

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarraySumCircular = function (nums) {
  let n = nums.length;
  const leftMax = new Array(n).fill(0);
  // 对坐标为 0 处的元素单独处理，避免考虑子数组为空的情况
  leftMax[0] = nums[0];
  let leftSum = nums[0];
  let pre = nums[0];
  let res = nums[0];
  for (let i = 1; i < n; i++) {
    pre = Math.max(pre + nums[i], nums[i]);
    res = Math.max(res, pre);
    leftSum += nums[i];
    leftMax[i] = Math.max(leftMax[i - 1], leftSum);
  }

  // 从右到左枚举后缀，固定后缀，选择最大前缀
  let rightSum = 0;
  for (let i = n - 1; i > 0; i--) {
    rightSum += nums[i];
    res = Math.max(res, rightSum + leftMax[i - 1]);
  }
  return res;
};
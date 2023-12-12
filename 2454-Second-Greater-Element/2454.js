// 2454. 下一个更大元素 IV
// 提示
// 困难
// 59
// 相关企业
// 给你一个下标从 0 开始的非负整数数组 nums 。对于 nums 中每一个整数，你必须找到对应元素的 第二大 整数。

// 如果 nums[j] 满足以下条件，那么我们称它为 nums[i] 的 第二大 整数：

// j > i
// nums[j] > nums[i]
// 恰好存在 一个 k 满足 i < k < j 且 nums[k] > nums[i] 。
// 如果不存在 nums[j] ，那么第二大整数为 - 1 。

// 比方说，数组[1, 2, 4, 3] 中，1 的第二大整数是 4 ，2 的第二大整数是 3 ，3 和 4 的第二大整数是 - 1 。
// 请你返回一个整数数组 answer ，其中 answer[i]是 nums[i] 的第二大整数。



// 示例 1：

// 输入：nums = [2, 4, 0, 9, 6]
// 输出：[9, 6, 6, -1, -1]
// 解释：
// 下标为 0 处：2 的右边，4 是大于 2 的第一个整数，9 是第二个大于 2 的整数。
// 下标为 1 处：4 的右边，9 是大于 4 的第一个整数，6 是第二个大于 4 的整数。
// 下标为 2 处：0 的右边，9 是大于 0 的第一个整数，6 是第二个大于 0 的整数。
// 下标为 3 处：右边不存在大于 9 的整数，所以第二大整数为 - 1 。
// 下标为 4 处：右边不存在大于 6 的整数，所以第二大整数为 - 1 。
// 所以我们返回[9, 6, 6, -1, -1] 。
// 示例 2：

// 输入：nums = [3, 3]
// 输出：[-1, -1]
// 解释：
// 由于每个数右边都没有更大的数，所以我们返回[-1, -1] 。


// 提示：

// 1 <= nums.length <= 10^5
// 0 <= nums[i] <= 10^9

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var secondGreaterElement = function (nums) {
  const n = nums.length;
  const res = new Array(n).fill(-1);
  const stack = [];
  const q = new MinPriorityQueue();

  for (let i = 0; i < n; i++) {
    while (!q.isEmpty() && q.front().element[0] < nums[i]) {
      res[q.front().element[1]] = nums[i];
      q.dequeue();
    }
    while (stack.length > 0 && nums[stack[stack.length - 1]] < nums[i]) {
      let x = stack[stack.length - 1]
      q.enqueue([nums[x], x], nums[x]);
      stack.pop();
    }
    stack.push(i);
  }
  return res;
};
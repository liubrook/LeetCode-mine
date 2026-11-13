// 3420. 统计 K 次操作以内得到非递减子数组的数目
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个长度为 n 的数组 nums 和一个整数 k 。

// 对于 nums 中的每一个子数组，你可以对它进行 至多 k 次操作。每次操作中，你可以将子数组中的任意一个元素增加 1 。

// 注意 ，每个子数组都是独立的，也就是说你对一个子数组的修改不会保留到另一个子数组中。

// 请你返回最多 k 次操作以内，有多少个子数组可以变成 非递减 的。

// 如果一个数组中的每一个元素都大于等于前一个元素（如果前一个元素存在），那么我们称这个数组是 非递减 的。

// 示例 1：

// 输入：nums = [6,3,1,2,4,4], k = 7

// 输出：17

// 解释：

// nums 的所有 21 个子数组中，只有子数组 [6, 3, 1] ，[6, 3, 1, 2] ，[6, 3, 1, 2, 4] 和 [6, 3, 1, 2, 4, 4] 无法在 k = 7 次操作以内变为非递减的。所以非递减子数组的数目为 21 - 4 = 17 。

// 示例 2：

// 输入：nums = [6,3,1,3,6], k = 4

// 输出：12

// 解释：

// 子数组 [3, 1, 3, 6] 和 nums 中所有小于等于三个元素的子数组中，除了 [6, 3, 1] 以外，都可以在 k 次操作以内变为非递减子数组。总共有 5 个包含单个元素的子数组，4 个包含两个元素的子数组，除 [6, 3, 1] 以外有 2 个包含三个元素的子数组，所以总共有 1 + 5 + 4 + 2 = 12 个子数组可以变为非递减的。

// 提示：

// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^9
// 1 <= k <= 10^9
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countNonDecreasingSubarrays = function (nums, k) {
  const n = nums.length;
  let ans = 0;
  let operations = 0;
  // 优先队列维护窗口最大值，元素为 { val, idx }
  const q = new MaxPriorityQueue((item) => item.val);
  // 记录被该下标覆盖的元素集合
  const cnt = Array.from({ length: n }, () => []);
  // 右侧第一个大于等于的下标
  const pos = new Array(n).fill(n);
  // 递减单调栈
  const st = [];

  let left = 0;
  for (let right = 0; right < n; right++) {
    // 维护单调栈
    while (st.length > 0 && nums[right] >= nums[st[st.length - 1]]) {
      pos[st[st.length - 1]] = right;
      st.pop();
    }
    // 栈顶即为 nums[right] 的左边最近的更大元素
    if (st.length > 0) {
      cnt[st[st.length - 1]].push(right);
    }
    st.push(right);

    // 优先队首元素即为窗口最大值
    q.enqueue({ val: nums[right], idx: right });
    // 窗口加入 nums[right] 操作次数需要增加
    operations += Math.max(0, q.front().val - nums[right]);

    // 最小操作次数超过 k，此时需要缩小窗口
    while (operations > k) {
      // 移除窗口左侧元素 nums[left]，操作次数需要较少
      for (const i of cnt[left]) {
        // 移除贡献
        operations -=
          (nums[left] - nums[i]) * (Math.min(pos[i], right + 1) - i);
      }
      left++;
    }

    // 从优先队列中移除小于下标 left 的元素
    while (!q.isEmpty() && q.front().idx < left) {
      q.dequeue();
    }

    // 以 right 为结尾的合法连续子数组数目为 right - left + 1
    ans += right - left + 1;
  }

  return ans;
};

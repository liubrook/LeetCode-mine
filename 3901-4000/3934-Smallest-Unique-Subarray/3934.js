// 3934. 最短唯一子数组
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个整数数组 nums 。

// 找出 nums 中与其他任何 子数组 均 不 相同 的 子数组 的 最小 长度。

// 返回一个整数，表示此类 子数组 的 最小可能长度 。

// 子数组 是数组中的一个连续的非空元素序列。

// 如果两个 子数组 具有相同的长度，并且对应位置的元素也相同，则认为这两个 子数组 是相同的。

// 示例 1：

// 输入： nums = [3,3,3]

// 输出： 3

// 解释：

// 长度为 1 的子数组：[3] → 出现 3 次
// 长度为 2 的子数组：[3, 3] → 出现 2 次
// 长度为 3 的子数组：[3, 3, 3] → 出现 1 次
// 子数组 [3, 3, 3] 是唯一的，因此最小唯一子数组的长度为 3。

// 示例 2：

// 输入： nums = [2,1,2,3,3]

// 输出： 1

// 解释：

// 长度为 1 的子数组：

// [2] → 出现 2 次
// [1] → 出现 1 次
// [3] → 出现 2 次
// 子数组 [1] 是唯一的，因此最小唯一子数组的长度为 1。
// 示例 3：

// 输入： nums = [1,1,2,2,1]

// 输出： 2

// 解释：

// 长度为 1 的子数组：

// [1] → 出现 3 次
// [2] → 出现 2 次
// 长度为 2 的子数组：

// [1, 1] → 出现 1 次
// [1, 2] → 出现 1 次
// [2, 2] → 出现 1 次
// [2, 1] → 出现 1 次
// 至少有一个长度为 2 的子数组是唯一的，因此最小唯一子数组的长度为 2。

// 提示：

// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^5
/**
 * @param {number[]} nums
 * @return {number}
 */
var smallestUniqueSubarray = function (nums) {
  const n = nums.length;
  const MOD = 1000000007n;
  const BASE = 911382323n;

  const h = new Array(n + 1).fill(0n);
  const p = new Array(n + 1).fill(0n);
  p[0] = 1n;

  // 计算哈希前缀 + BASE 的幂次前缀
  for (let i = 0; i < n; ++i) {
    h[i + 1] = (h[i] * BASE + BigInt(nums[i])) % MOD;
    p[i + 1] = (p[i] * BASE) % MOD;
  }

  const check = (len) => {
    const cnt = new Map();

    for (let l = 0; l + len <= n; ++l) {
      const r = l + len;
      const key = (h[r] - ((h[l] * p[len]) % MOD) + MOD) % MOD;
      cnt.set(key, (cnt.get(key) ?? 0) + 1);
    }

    for (const times of cnt.values()) {
      if (times === 1) {
        return true;
      }
    }
    return false;
  };

  let lo = 1;
  let hi = n;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);

    if (check(mid)) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }

  return lo;
};

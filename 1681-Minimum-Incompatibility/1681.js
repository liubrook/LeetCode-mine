// 1681. 最小不兼容性
// 给你一个整数数组 nums​​​ 和一个整数 k 。你需要将这个数组划分到 k 个相同大小的子集中，使得同一个子集里面没有两个相同的元素。

// 一个子集的 不兼容性 是该子集里面最大值和最小值的差。

// 请你返回将数组分成 k 个子集后，各子集 不兼容性 的 和 的 最小值 ，如果无法分成分成 k 个子集，返回 - 1 。

// 子集的定义是数组中一些数字的集合，对数字顺序没有要求。



// 示例 1：

// 输入：nums = [1, 2, 1, 4], k = 2
// 输出：4
// 解释：最优的分配是[1, 2] 和[1, 4] 。
// 不兼容性和为(2 - 1) + (4 - 1) = 4 。
// 注意到[1, 1] 和[2, 4] 可以得到更小的和，但是第一个集合有 2 个相同的元素，所以不可行。
// 示例 2：

// 输入：nums = [6, 3, 8, 1, 3, 1, 2, 2], k = 4
// 输出：6
// 解释：最优的子集分配为[1, 2]，[2, 3]，[6, 8] 和[1, 3] 。
// 不兼容性和为(2 - 1) + (3 - 2) + (8 - 6) + (3 - 1) = 6 。
// 示例 3：

// 输入：nums = [5, 3, 3, 6, 3, 3], k = 3
// 输出：-1
// 解释：没办法将这些数字分配到 3 个子集且满足每个子集里没有相同数字。


// 提示：

// 1 <= k <= nums.length <= 16
// nums.length 能被 k 整除。
// 1 <= nums[i] <= nums.length

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumIncompatibility = function (nums, k) {
  const n = nums.length, group = n / k, inf = Infinity;
  const dp = new Array(1 << n).fill(inf);
  dp[0] = 0;
  const values = new Map();

  for (let mask = 1; mask < (1 << n); mask++) {
    if (countOnes(mask) !== group) {
      continue;
    }
    let mn = 20,
      mx = 0;
    const cur = new Set();
    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) > 0) {
        if (cur.has(nums[i])) {
          break;
        }
        cur.add(nums[i]);
        mn = Math.min(mn, nums[i]);
        mx = Math.max(mx, nums[i]);
      }
    }
    if (cur.size == group) {
      values.set(mask, mx - mn);
    }
  }

  for (let mask = 0; mask < (1 << n); mask++) {
    if (dp[mask] == inf) {
      continue;
    }
    const seen = new Map();
    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) == 0) {
        seen.set(nums[i], i);
      }
    }
    if (seen.size < group) {
      continue;
    }
    let sub = 0;
    for (let v of seen.values()) {
      sub |= (1 << v);
    }
    let nxt = sub;
    while (nxt > 0) {
      if (values.has(nxt)) {
        dp[mask | nxt] = Math.min(dp[mask | nxt], dp[mask] + values.get(nxt));
      }
      nxt = (nxt - 1) & sub;
    }
  }

  return (dp[(1 << n) - 1] < inf) ? dp[(1 << n) - 1] : -1;
}

function countOnes(n) {
  let count = 0;
  while (n > 0) {
    count++;
    n &= n - 1;
  }
  return count;
}
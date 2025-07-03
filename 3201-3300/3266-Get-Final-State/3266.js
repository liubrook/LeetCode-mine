// 3266. K 次乘运算后的最终数组 II
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个整数数组 nums ，一个整数 k  和一个整数 multiplier 。

// 你需要对 nums 执行 k 次操作，每次操作中：

// 找到 nums 中的 最小 值 x ，如果存在多个最小值，选择最 前面 的一个。
// 将 x 替换为 x * multiplier 。
// k 次操作以后，你需要将 nums 中每一个数值对 109 + 7 取余。

// 请你返回执行完 k 次乘运算以及取余运算之后，最终的 nums 数组。



// 示例 1：

// 输入：nums = [2, 1, 3, 5, 6], k = 5, multiplier = 2

// 输出：[8, 4, 6, 5, 6]

// 解释：

// 操作	结果
// 1 次操作后[2, 2, 3, 5, 6]
// 2 次操作后[4, 2, 3, 5, 6]
// 3 次操作后[4, 4, 3, 5, 6]
// 4 次操作后[4, 4, 6, 5, 6]
// 5 次操作后[8, 4, 6, 5, 6]
// 取余操作后[8, 4, 6, 5, 6]
// 示例 2：

// 输入：nums = [100000, 2000], k = 2, multiplier = 1000000

// 输出：[999999307, 999999993]

// 解释：

// 操作	结果
// 1 次操作后[100000, 2000000000]
// 2 次操作后[100000000000, 2000000000]
// 取余操作后[999999307, 999999993]


// 提示：

// 1 <= nums.length <= 10^4
// 1 <= nums[i] <= 10^9
// 1 <= k <= 10^9
// 1 <= multiplier <= 10^6

/**
 * @param {number[]} nums
 * @param {number} k
 * @param {number} multiplier
 * @return {number[]}
 */
var getFinalState = function (nums, k, multiplier) {
  const quickMul = (x, y, m) => {
    let res = BigInt(1);
    while (y > 0n) {
      if (y % 2n === 1n) {
        res = (res * x) % m;
      }
      y >>= 1n;
      x = (x * x) % m;
    }
    return res;
  };

  if (multiplier === 1) {
    return nums;
  }
  const n = nums.length;
  const m = 1000000007;
  let mx = 0;
  const pq = new MinPriorityQueue({
    priority: (a) => a.first * 100000 + a.second
  });
  for (let i = 0; i < n; i++) {
    mx = Math.max(mx, nums[i]);
    pq.enqueue({
      first: nums[i],
      second: i
    });
  }
  for (; pq.front().element.first < mx && k > 0; k--) {
    let x = pq.dequeue().element;
    x.first *= multiplier;
    pq.enqueue(x);
  }
  for (let i = 0; i < n; i++) {
    let x = pq.dequeue().element;
    const t = Math.floor(k / n) + (i < k % n ? 1 : 0);
    nums[x.second] = Number(((BigInt(x.first) % BigInt(m)) * quickMul(BigInt(multiplier), BigInt(t), BigInt(m))) % BigInt(m));
  }
  return nums;
};
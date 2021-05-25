// 1787. 使所有区间的异或结果为零
// 给你一个整数数组 nums​​​ 和一个整数 k​​​​​ 。区间[left, right]（left <= right）的 异或结果 是对下标位于 left 和 right（包括 left 和 right ）之间所有元素进行 XOR 运算的结果：nums[left] XOR nums[left + 1] XOR ...XOR nums[right]。

// 返回数组中 要更改的最小元素数 ，以使所有长度为 k 的区间异或结果等于零。



// 示例 1：

// 输入：nums = [1, 2, 0, 3, 0], k = 1
// 输出：3
// 解释：将数组[1, 2, 0, 3, 0] 修改为[0, 0, 0, 0, 0]
// 示例 2：

// 输入：nums = [3, 4, 5, 2, 1, 7, 3, 4, 7], k = 3
// 输出：3
// 解释：将数组[3, 4, 5, 2, 1, 7, 3, 4, 7] 修改为[3, 4, 7, 3, 4, 7, 3, 4, 7]
// 示例 3：

// 输入：nums = [1, 2, 4, 1, 2, 5, 1, 2, 6], k = 3
// 输出：3
// 解释：将数组[1, 2, 4, 1, 2, 5, 1, 2, 6] 修改为[1, 2, 3, 1, 2, 3, 1, 2, 3]


// 提示：

// 1 <= k <= nums.length <= 2000
// 0 <= nums[i] < 210


/**
 * @param {number[]} nums​​​
 * @param {number} k
 * @return {number}
 */

var minChanges = function (nums, k) {
  // x 的范围为 [0, 2 ^ 10]
  const MAXX = 2 ** 10;

  const n = nums.length;
  let f = new Array(MAXX).fill(Number.MAX_VALUE);
  // 边界条件 f(-1, 0) = 0
  f[0] = 0;

  for (let i = 0; i < k; i++) {
    // 第 i 个组的哈希映射
    const count = new Map();
    let size = 0;
    for (let j = i; j < n; j += k) {
      count.has(nums[j]) ? count.set(nums[j], count.get(nums[j]) + 1) : count.set(nums[j], 1);
      size++;
    }

    // 求出 t2
    const t2min = Math.min(...f);

    const g = new Array(MAXX).fill(t2min);
    for (let mask = 0; mask < MAXX; mask++) {
      // t1 则需要枚举 x 才能求出
      for (const [x, countx] of count.entries()) {
        g[mask] = Math.min(g[mask], f[mask ^ x] - countx);
      }
    }

    // 别忘了加上 size
    for (const [index, val] of g.entries()) {
      f[index] = val + size;
    }
  }
  return f[0];
}
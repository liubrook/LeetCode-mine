// 2916. 子数组不同元素数目的平方和 II
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个下标从 0 开始的整数数组 nums 。

// 定义 nums 一个子数组的 不同计数 值如下：

// 令 nums[i..j] 表示 nums 中所有下标在 i 到 j 范围内的元素构成的子数组（满足 0 <= i <= j < nums.length ），那么我们称子数组 nums[i..j] 中不同值的数目为 nums[i..j] 的不同计数。
// 请你返回 nums 中所有子数组的 不同计数 的 平方 和。

// 由于答案可能会很大，请你将它对 109 + 7 取余 后返回。

// 子数组指的是一个数组里面一段连续 非空 的元素序列。

// 示例 1：

// 输入：nums = [1,2,1]
// 输出：15
// 解释：六个子数组分别为：
// [1]: 1 个互不相同的元素。
// [2]: 1 个互不相同的元素。
// [1]: 1 个互不相同的元素。
// [1,2]: 2 个互不相同的元素。
// [2,1]: 2 个互不相同的元素。
// [1,2,1]: 2 个互不相同的元素。
// 所有不同计数的平方和为 12 + 12 + 12 + 22 + 22 + 22 = 15 。
// 示例 2：

// 输入：nums = [2,2]
// 输出：3
// 解释：三个子数组分别为：
// [2]: 1 个互不相同的元素。
// [2]: 1 个互不相同的元素。
// [2,2]: 1 个互不相同的元素。
// 所有不同计数的平方和为 12 + 12 + 12 = 3 。

// 提示：

// 1 <= nums.length <= 10^5
// 1 <= nums[i] <= 10^5
/**
 * @param {number[]} nums
 * @return {number}
 */
var sumCounts = function (nums) {
  let n = nums.length;
  let res = 0n,
    cur = 0n;
  let bit = new BIT(n + 10);
  let seen = new Map();
  let mod = 1000000007n;
  for (let i = 0; i < n; i++) {
    let a = nums[i];
    let j = (seen.has(a) ? seen.get(a) : -1) + 1;
    let q = BigInt(bit.query(j, i));
    cur = (cur + q * 2n + BigInt(i - j + 1)) % mod;
    res = (res + cur) % mod;
    bit.add(j, i, 1);
    seen.set(a, i);
  }
  return Number(res);
};
class BIT {
  constructor(n) {
    this.size = n;
    this._tree1 = new Float64Array(n + 2);
    this._tree2 = new Float64Array(n + 2);
  }

  _lowbit(index) {
    return index & -index;
  }

  add(left, right, delta) {
    this._add(left, delta);
    this._add(right + 1, -delta);
  }

  query(left, right) {
    return this._query(right) - this._query(left - 1);
  }

  _add(index, delta) {
    index += 1;
    let rawIndex = index;
    while (index <= this.size) {
      this._tree1[index] += delta;
      this._tree2[index] += rawIndex * delta;
      index += this._lowbit(index);
    }
  }

  _query(index) {
    index += 1;
    let rawIndex = index + 1;
    if (index > this.size) {
      index = this.size;
    }
    let res = 0;
    while (index > 0) {
      res += rawIndex * this._tree1[index] - this._tree2[index];
      index -= this._lowbit(index);
    }
    return res;
  }
}

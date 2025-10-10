// 3186. 施咒的最大总伤害
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 一个魔法师有许多不同的咒语。

// 给你一个数组 power ，其中每个元素表示一个咒语的伤害值，可能会有多个咒语有相同的伤害值。

// 已知魔法师使用伤害值为 power[i] 的咒语时，他们就 不能 使用伤害为 power[i] - 2 ，power[i] - 1 ，power[i] + 1 或者 power[i] + 2 的咒语。

// 每个咒语最多只能被使用 一次 。

// 请你返回这个魔法师可以达到的伤害值之和的 最大值 。



// 示例 1：

// 输入：power = [1, 1, 3, 4]

// 输出：6

// 解释：

// 可以使用咒语 0，1，3，伤害值分别为 1，1，4，总伤害值为 6 。

// 示例 2：

// 输入：power = [7, 1, 6, 6]

// 输出：13

// 解释：

// 可以使用咒语 1，2，3，伤害值分别为 1，6，6，总伤害值为 13 。



// 提示：

// 1 <= power.length <= 10^5
// 1 <= power[i] <= 10^9

/**
 * @param {number[]} power
 * @return {number}
 */
var maximumTotalDamage = function (power) {
  let count = new Map();
  for (let p of power) {
    count.set(p, (count.get(p) || 0) + 1);
  }
  let vec = [[-1000000000, 0]];
  let keys = Array.from(count.keys()).sort((a, b) => a - b);
  for (let k of keys) {
    vec.push([k, count.get(k)]);
  }
  let n = vec.length;
  let f = Array(n).fill(0);
  let mx = 0, ans = 0, j = 1;
  for (let i = 1; i < n; i++) {
    while (j < i && vec[j][0] < vec[i][0] - 2) {
      mx = Math.max(mx, f[j]);
      j++;
    }
    f[i] = mx + vec[i][0] * vec[i][1];
    ans = Math.max(ans, f[i]);
  }
  return ans;
};
// 1871. 跳跃游戏 VII
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个下标从 0 开始的二进制字符串 s 和两个整数 minJump 和 maxJump 。一开始，你在下标 0 处，且该位置的值一定为 '0' 。当同时满足如下条件时，你可以从下标 i 移动到下标 j 处：

// i + minJump <= j <= min(i + maxJump, s.length - 1) 且
// s[j] == '0'.
// 如果你可以到达 s 的下标 s.length - 1 处，请你返回 true ，否则返回 false 。

// 示例 1：

// 输入：s = "011010", minJump = 2, maxJump = 3
// 输出：true
// 解释：
// 第一步，从下标 0 移动到下标 3 。
// 第二步，从下标 3 移动到下标 5 。
// 示例 2：

// 输入：s = "01101110", minJump = 2, maxJump = 3
// 输出：false

// 提示：

// 2 <= s.length <= 10^5
// s[i] 要么是 '0' ，要么是 '1'
// s[0] == '0'
// 1 <= minJump <= maxJump < s.length
/**
 * @param {string} s
 * @param {number} minJump
 * @param {number} maxJump
 * @return {boolean}
 */
var canReach = function (s, minJump, maxJump) {
  const n = s.length;
  const f = new Array(n).fill(0);
  const pre = new Array(n).fill(0);
  f[0] = 1;
  // 由于我们从 i = minJump 开始动态规划, 因此需要将 【0，minJump] 这部分的前缀和预处理出来
  for (let i = 0; i < minJump; i++) {
    pre[i] = 1;
  }
  for (let i = minJump; i < n; i++) {
    const left = i - maxJump;
    const right = i - minJump;
    if (s[i] === "0") {
      const total = pre[right] - (left <= 0 ? 0 : pre[left - 1]);
      f[i] = total !== 0 ? 1 : 0;
    }
    pre[i] = pre[i - 1] + f[i];
  }
  return f[n - 1] === 1;
};

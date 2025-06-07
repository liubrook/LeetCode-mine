// 1124. 表现良好的最长时间段
// 给你一份工作时间表 hours，上面记录着某一位员工每天的工作小时数。

// 我们认为当员工一天中的工作小时数大于 8 小时的时候，那么这一天就是「劳累的一天」。

// 所谓「表现良好的时间段」，意味在这段时间内，「劳累的天数」是严格 大于「不劳累的天数」。

// 请你返回「表现良好时间段」的最大长度。



// 示例 1：

// 输入：hours = [9,9,6,0,6,6,9]
// 输出：3
// 解释：最长的表现良好时间段是 [9,9,6]。
// 示例 2：

// 输入：hours = [6,6,6]
// 输出：0


// 提示：

// 1 <= hours.length <= 10^4
// 0 <= hours[i] <= 16

/**
 * @param {number[]} hours
 * @return {number}
 */
var longestWPI = function (hours) {
  const n = hours.length;
  const s = new Array(n + 1).fill(0);
  const stk = [0];
  for (let i = 1; i <= n; i++) {
    s[i] = s[i - 1] + (hours[i - 1] > 8 ? 1 : -1);
    if (s[stk[stk.length - 1]] > s[i]) {
      stk.push(i);
    }
  }

  let res = 0;
  for (let r = n; r >= 1; r--) {
    while (stk.length && s[stk[stk.length - 1]] < s[r]) {
      res = Math.max(res, r - stk.pop());
    }
  }
  return res;
};
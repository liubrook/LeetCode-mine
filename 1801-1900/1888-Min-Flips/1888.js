// 1888. 使二进制字符串字符交替的最少反转次数
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个二进制字符串 s 。你可以按任意顺序执行以下两种操作任意次：

// 类型 1 ：删除 字符串 s 的第一个字符并将它 添加 到字符串结尾。
// 类型 2 ：选择 字符串 s 中任意一个字符并将该字符 反转 ，也就是如果值为 '0' ，则反转得到 '1' ，反之亦然。
// 请你返回使 s 变成 交替 字符串的前提下， 类型 2 的 最少 操作次数 。

// 我们称一个字符串是 交替 的，需要满足任意相邻字符都不同。

// 比方说，字符串 "010" 和 "1010" 都是交替的，但是字符串 "0100" 不是。

// 示例 1：

// 输入：s = "111000"
// 输出：2
// 解释：执行第一种操作两次，得到 s = "100011" 。
// 然后对第三个和第六个字符执行第二种操作，得到 s = "101010" 。
// 示例 2：

// 输入：s = "010"
// 输出：0
// 解释：字符串已经是交替的。
// 示例 3：

// 输入：s = "1110"
// 输出：1
// 解释：对第二个字符执行第二种操作，得到 s = "1010" 。

// 提示：

// 1 <= s.length <= 10^5
// s[i] 要么是 '0' ，要么是 '1' 。
/**
 * @param {string} s
 * @return {number}
 */
var minFlips = function (s) {
  // 示性函数
  const I = (ch, x) => (parseInt(ch) === x ? 1 : 0);

  const n = s.length;
  const pre = new Array(n);
  for (let i = 0; i < n; i++) {
    pre[i] = new Array(2);
  }

  // 注意 i=0 的边界情况
  for (let i = 0; i < n; ++i) {
    if (i === 0) {
      pre[i][0] = I(s[i], 1);
      pre[i][1] = I(s[i], 0);
    } else {
      pre[i][0] = pre[i - 1][1] + I(s[i], 1);
      pre[i][1] = pre[i - 1][0] + I(s[i], 0);
    }
  }

  let ans = Math.min(pre[n - 1][0], pre[n - 1][1]);
  if (n % 2 === 1) {
    // 如果 n 是奇数，还需要求出 suf
    const suf = new Array(n);
    for (let i = 0; i < n; i++) {
      suf[i] = new Array(2);
    }

    // 注意 i=n-1 的边界情况
    for (let i = n - 1; i >= 0; --i) {
      if (i === n - 1) {
        suf[i][0] = I(s[i], 1);
        suf[i][1] = I(s[i], 0);
      } else {
        suf[i][0] = suf[i + 1][1] + I(s[i], 1);
        suf[i][1] = suf[i + 1][0] + I(s[i], 0);
      }
    }

    for (let i = 0; i + 1 < n; ++i) {
      ans = Math.min(ans, pre[i][0] + suf[i + 1][0]);
      ans = Math.min(ans, pre[i][1] + suf[i + 1][1]);
    }
  }

  return ans;
};

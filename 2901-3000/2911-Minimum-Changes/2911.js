// 2911. 得到 K 个半回文串的最少修改次数
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个字符串 s 和一个整数 k，请将 s 划分为 k 个 非空子串 ，使得将每个子串变为 半回文串 所需的字符修改次数之和最小。

// 返回所需的 最少 字符修改次数。

// 半回文串 是一类特殊的字符串：它可以按照某种重复模式拆分后，使每一组都成为 回文串 。判断一个字符串是否为半回文串的方法如下：

// 选择该字符串长度的一个正因数 d。其中，d 的取值范围是从 1 到严格小于字符串长度的所有正因数。对于长度为 1 的字符串，根据这一定义，它不存在合法的因数，因为唯一的因数就是其长度本身，而这是不允许的。
// 对于给定的因数 d，将字符串按长度为 d 的重复模式分组。具体来说，第 1 组由位置 1、1 + d、1 + 2d、…… 上的字符组成；第 2 组由位置 2、2 + d、2 + 2d、…… 上的字符组成；以此类推。
// 如果这些分组中的每一组都是回文串，则该字符串被视为半回文串。
// 以字符串 "abcabc" 为例：

// "abcabc" 的长度为 6。合法的因数有 1、2 和 3。
// 当 d = 1 时：整个字符串 "abcabc" 构成一组。它不是回文串。
// 当 d = 2 时：
// 第 1 组（位置 1, 3, 5）："acb"
// 第 2 组（位置 2, 4, 6）："bac"
// 这两组都不是回文串。
// 当 d = 3 时：
// 第 1 组（位置 1, 4）："aa"
// 第 2 组（位置 2, 5）："bb"
// 第 3 组（位置 3, 6）："cc"
// 所有分组都是回文串。因此，"abcabc" 是一个半回文串。

// 示例 1：

// 输入： s = "abcac", k = 2

// 输出： 1

// 解释： 将 s 划分为 "ab" 和 "cac"。"cac" 本身已经是半回文串。将 "ab" 改为 "aa" 后，它在 d = 1 时成为半回文串。

// 示例 2：

// 输入： s = "abcdef", k = 2

// 输出： 2

// 解释： 将其划分为子串 "abc" 和 "def"。这两个子串各自都需要修改 1 个字符才能变成半回文串。

// 示例 3：

// 输入： s = "aabbaa", k = 3

// 输出： 0

// 解释： 将其划分为子串 "aa"、"bb" 和 "aa"。它们都已经是半回文串。

// 提示：

// 2 <= s.length <= 200
// 1 <= k <= s.length / 2
// s 仅由小写英文字母组成。
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var minimumChanges = function (s, k) {
  const n = s.length;
  const factors = Array.from({ length: n + 1 }, () => []);
  // 预处理每个数的真因子
  for (let d = 1; d <= Math.floor(n / 2); d++) {
    for (let m = d * 2; m <= n; m += d) {
      factors[m].push(d);
    }
  }
  const cost = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let l = 0; l + 1 < n; l++) {
    for (let r = l + 1; r < n; r++) {
      // 子串长度至少为 2
      cost[l][r] = segmentCost(s, l, r - l + 1, factors);
    }
  }

  const memo = Array.from({ length: k + 1 }, () => new Array(n).fill(-1));
  const solve = (seg, start) => {
    if (seg === 1) {
      // 只剩一段
      return cost[start][n - 1];
    }
    if (memo[seg][start] !== -1) {
      // 之前算过
      return memo[seg][start];
    }
    let best = n;
    const limit = n - 1 - 2 * (seg - 1); // 第一段之后还要留出 seg-1 段
    for (let e = start + 1; e <= limit; e++) {
      best = Math.min(best, cost[start][e] + solve(seg - 1, e + 1));
    }
    memo[seg][start] = best;
    return best;
  };
  return solve(k, 0);
};
function segmentCost(s, l, m, factors) {
  let best = m;
  for (const d of factors[m]) {
    const groups = Math.floor(m / d); // 每组有 groups 个字符
    let changes = 0;
    for (let offset = 0; offset < d; offset++) {
      for (let t = 0; t < Math.floor(groups / 2); t++) {
        // 组内首尾配对
        if (s[l + offset + t * d] !== s[l + offset + (groups - 1 - t) * d]) {
          changes++;
        }
      }
    }
    best = Math.min(best, changes);
  }
  return best;
}

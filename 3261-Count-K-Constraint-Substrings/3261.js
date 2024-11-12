// 3261. 统计满足 K 约束的子字符串数量 II
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个 二进制 字符串 s 和一个整数 k。

// 另给你一个二维整数数组 queries ，其中 queries[i] = [li, ri] 。

// 如果一个 二进制字符串 满足以下任一条件，则认为该字符串满足 k 约束：

// 字符串中 0 的数量最多为 k。
// 字符串中 1 的数量最多为 k。
// 返回一个整数数组 answer ，其中 answer[i] 表示 s[li..ri] 中满足 k 约束 的
// 子字符串
// 的数量。



// 示例 1：

// 输入：s = "0001111", k = 2, queries = [[0, 6]]

// 输出：[26]

// 解释：

// 对于查询[0, 6]， s[0..6] = "0001111" 的所有子字符串中，除 s[0..5] = "000111" 和 s[0..6] = "0001111" 外，其余子字符串都满足 k 约束。

// 示例 2：

// 输入：s = "010101", k = 1, queries = [[0, 5], [1, 4], [2, 3]]

// 输出：[15, 9, 3]

// 解释：

// s 的所有子字符串中，长度大于 3 的子字符串都不满足 k 约束。



// 提示：

// 1 <= s.length <= 10^5
// s[i] 是 '0' 或 '1'
// 1 <= k <= s.length
// 1 <= queries.length <= 10^5
// queries[i] == [li, ri]
// 0 <= li <= ri < s.length
// 所有查询互不相同

/**
 * @param {string} s
 * @param {number} k
 * @param {number[][]} queries
 * @return {number[]}
 */
var countKConstraintSubstrings = function (s, k, queries) {
  const n = s.length;
  const count = [0, 0];
  const right = Array(n).fill(n);
  const prefix = Array(n + 1).fill(0);
  let i = 0;
  for (let j = 0; j < n; ++j) {
    count[s[j] - '0']++;
    while (count[0] > k && count[1] > k) {
      count[s[i] - '0']--;
      right[i] = j;
      i++;
    }
    prefix[j + 1] = prefix[j] + j - i + 1;
  }

  const res = [];
  for (const query of queries) {
    const l = query[0], r = query[1];
    const i = Math.min(right[l], r + 1);
    const part1 = Math.floor((i - l + 1) * (i - l) / 2);
    const part2 = prefix[r + 1] - prefix[i];
    res.push(part1 + part2);
  }
  return res;
};
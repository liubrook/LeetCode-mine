// 3003. 执行操作后的最大分割数量
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个下标从 0 开始的字符串 s 和一个整数 k。

// 你需要执行以下分割操作，直到字符串 s 变为 空：

// 选择 s 的最长 前缀，该前缀最多包含 k 个 不同 字符。
// 删除 这个前缀，并将分割数量加一。如果有剩余字符，它们在 s 中保持原来的顺序。
// 执行操作之 前 ，你可以将 s 中 至多一处 下标的对应字符更改为另一个小写英文字母。

// 在最优选择情形下改变至多一处下标对应字符后，用整数表示并返回操作结束时得到的 最大 分割数量。



// 示例 1：

// 输入：s = "accca", k = 2

// 输出：3

// 解释：

// 最好的方式是把 s[2] 变为除了 a 和 c 之外的东西，比如 b。然后它变成了 "acbca"。

// 然后我们执行以下操作：

// 最多包含 2 个不同字符的最长前缀是 "ac"，我们删除它然后 s 变为 "bca"。
// 现在最多包含 2 个不同字符的最长前缀是 "bc"，所以我们删除它然后 s 变为 "a"。
// 最后，我们删除 "a" 并且 s 变成空串，所以该过程结束。
// 进行操作时，字符串被分成 3 个部分，所以答案是 3。

// 示例 2：

// 输入：s = "aabaab", k = 3

// 输出：1

// 解释：

// 一开始 s 包含 2 个不同的字符，所以无论我们改变哪个， 它最多包含 3 个不同字符，因此最多包含 3 个不同字符的最长前缀始终是所有字符，因此答案是 1。

// 示例 3：

// 输入：s = "xxyz", k = 1

// 输出：4

// 解释：

// 最好的方式是将 s[0] 或 s[1] 变为 s 中字符以外的东西，例如将 s[0] 变为 w。

// 然后 s 变为 "wxyz"，包含 4 个不同的字符，所以当 k 为 1，它将分为 4 个部分。



// 提示：

// 1 <= s.length <= 10^4
// s 只包含小写英文字母。
// 1 <= k <= 26

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxPartitionsAfterOperations = function (s, k) {
  const n = s.length;
  const left = Array(n).fill().map(() => Array(3).fill(0));
  const right = Array(n).fill().map(() => Array(3).fill(0));

  let num = 0, mask = 0, count = 0;
  for (let i = 0; i < n - 1; i++) {
    const binary = 1 << (s.charCodeAt(i) - 97);
    if (!(mask & binary)) {
      count++;
      if (count <= k) {
        mask |= binary;
      } else {
        num++;
        mask = binary;
        count = 1;
      }
    }
    left[i + 1][0] = num;
    left[i + 1][1] = mask;
    left[i + 1][2] = count;
  }

  num = 0; mask = 0; count = 0;
  for (let i = n - 1; i > 0; i--) {
    const binary = 1 << (s.charCodeAt(i) - 97);
    if (!(mask & binary)) {
      count++;
      if (count <= k) {
        mask |= binary;
      } else {
        num++;
        mask = binary;
        count = 1;
      }
    }
    right[i - 1][0] = num;
    right[i - 1][1] = mask;
    right[i - 1][2] = count;
  }

  let max = 0;
  for (let i = 0; i < n; i++) {
    let seg = left[i][0] + right[i][0] + 2;
    let totMask = left[i][1] | right[i][1];
    let totCount = 0;
    while (totMask) {
      totMask = totMask & (totMask - 1);
      totCount++;
    }
    if (left[i][2] === k && right[i][2] === k && totCount < 26) {
      seg++;
    } else if (Math.min(totCount + 1, 26) <= k) {
      seg--;
    }
    max = Math.max(max, seg);
  }
  return max;
};
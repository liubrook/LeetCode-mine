// 833. 字符串中的查找与替换
// 中等
// 149
// 相关企业
// 你会得到一个字符串 s(索引从 0 开始)，你必须对它执行 k 个替换操作。替换操作以三个长度均为 k 的并行数组给出：indices, sources, targets。

// 要完成第 i 个替换操作:

// 检查 子字符串  sources[i] 是否出现在 原字符串 s 的索引 indices[i] 处。
// 如果没有出现， 什么也不做 。
// 如果出现，则用 targets[i] 替换 该子字符串。
// 例如，如果 s = "abcd" ， indices[i] = 0, sources[i] = "ab"， targets[i] = "eee" ，那么替换的结果将是 "eeecd" 。

// 所有替换操作必须 同时 发生，这意味着替换操作不应该影响彼此的索引。测试用例保证元素间不会重叠 。

// 例如，一个 s = "abc" ，  indices = [0, 1] ， sources = ["ab"，"bc"] 的测试用例将不会生成，因为 "ab" 和 "bc" 替换重叠。
// 在对 s 执行所有替换操作后返回 结果字符串 。

// 子字符串 是字符串中连续的字符序列。



// 示例 1：

// https://assets.leetcode.com/uploads/2021/06/12/833-ex1.png

// 输入：s = "abcd", indices = [0, 2], sources = ["a", "cd"], targets = ["eee", "ffff"]
// 输出："eeebffff"
// 解释：
// "a" 从 s 中的索引 0 开始，所以它被替换为 "eee"。
// "cd" 从 s 中的索引 2 开始，所以它被替换为 "ffff"。
// 示例 2：
// https://assets.leetcode.com/uploads/2021/06/12/833-ex2-1.png
// 输入：s = "abcd", indices = [0, 2], sources = ["ab", "ec"], targets = ["eee", "ffff"]
// 输出："eeecd"
// 解释：
// "ab" 从 s 中的索引 0 开始，所以它被替换为 "eee"。
// "ec" 没有从原始的 S 中的索引 2 开始，所以它没有被替换。


// 提示：

// 1 <= s.length <= 1000
// k == indices.length == sources.length == targets.length
// 1 <= k <= 100
// 0 <= indices[i] < s.length
// 1 <= sources[i].length, targets[i].length <= 50
// s 仅由小写英文字母组成
// sources[i] 和 targets[i] 仅由小写英文字母组成

/**
 * @param {string} s
 * @param {number[]} indices
 * @param {string[]} sources
 * @param {string[]} targets
 * @return {string}
 */
var findReplaceString = function (s, indices, sources, targets) {
  const n = s.length, m = indices.length;

  const ops = new Map();
  for (let i = 0; i < m; i++) {
    if (!ops.has(indices[i])) {
      ops.set(indices[i], []);
    }
    ops.get(indices[i]).push(i);
  }

  let ans = "";
  for (let i = 0; i < n;) {
    let succeed = false;
    if (ops.has(i)) {
      console.log(ops.get(i))
      for (const pt of ops.get(i)) {
        if (s.substring(i, Math.min(i + sources[pt].length, n)) === sources[pt]) {
          succeed = true;
          ans += targets[pt];
          i += sources[pt].length;
          break;
        }
      }
    }
    if (!succeed) {
      ans += s[i];
      ++i;
    }
  }
  return ans;
};
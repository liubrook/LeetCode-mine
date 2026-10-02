// 22. 括号生成
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

// 示例 1：

// 输入：n = 3
// 输出：["((()))","(()())","(())()","()(())","()()()"]
// 示例 2：

// 输入：n = 1
// 输出：["()"]

// 提示：

// 1 <= n <= 8
/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  const ans = [];
  const path = []; // 记录左括号的下标

  // 目前填了 i 个括号
  // 这 i 个括号中的左括号个数 - 右括号个数 = balance
  function dfs(i, balance) {
    if (path.length === n) {
      const s = Array(n * 2).fill(")");
      for (const j of path) {
        s[j] = "(";
      }
      ans.push(s.join(""));
      return;
    }
    // 枚举填 right=0,1,2,...,balance 个右括号
    for (let right = 0; right <= balance; right++) {
      // 先填 right 个右括号，然后填 1 个左括号，记录左括号的下标 i+right
      path.push(i + right);
      dfs(i + right + 1, balance - right + 1);
      path.pop(); // 恢复现场
    }
  }

  dfs(0, 0);
  return ans;
};

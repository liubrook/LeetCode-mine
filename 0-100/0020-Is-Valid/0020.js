// 20. 有效的括号
// 已解答
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 每个右括号都有一个对应的相同类型的左括号。

// 示例 1：

// 输入：s = "()"

// 输出：true

// 示例 2：

// 输入：s = "()[]{}"

// 输出：true

// 示例 3：

// 输入：s = "(]"

// 输出：false

// 示例 4：

// 输入：s = "([])"

// 输出：true

// 示例 5：

// 输入：s = "([)]"

// 输出：false

// 提示：

// 1 <= s.length <= 10^4
// s 仅由括号 '()[]{}' 组成
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const n = s.length;
  if (n % 2 === 1) {
    return false;
  }
  const pairs = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);
  const stk = [];
  for (let ch of s) {
    if (pairs.has(ch)) {
      if (!stk.length || stk[stk.length - 1] !== pairs.get(ch)) {
        return false;
      }
      stk.pop();
    } else {
      stk.push(ch);
    }
  }
  return !stk.length;
};

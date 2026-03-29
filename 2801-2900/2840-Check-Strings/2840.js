// 2840. 判断通过操作能否让字符串相等 II
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你两个字符串 s1 和 s2 ，两个字符串长度都为 n ，且只包含 小写 英文字母。

// 你可以对两个字符串中的 任意一个 执行以下操作 任意 次：

// 选择两个下标 i 和 j ，满足 i < j 且 j - i 是 偶数，然后 交换 这个字符串中两个下标对应的字符。

// 如果你可以让字符串 s1 和 s2 相等，那么返回 true ，否则返回 false 。

// 示例 1：

// 输入：s1 = "abcdba", s2 = "cabdab"
// 输出：true
// 解释：我们可以对 s1 执行以下操作：
// - 选择下标 i = 0 ，j = 2 ，得到字符串 s1 = "cbadba" 。
// - 选择下标 i = 2 ，j = 4 ，得到字符串 s1 = "cbbdaa" 。
// - 选择下标 i = 1 ，j = 5 ，得到字符串 s1 = "cabdab" = s2 。
// 示例 2：

// 输入：s1 = "abe", s2 = "bea"
// 输出：false
// 解释：无法让两个字符串相等。

// 提示：

// n == s1.length == s2.length
// 1 <= n <= 10^5
// s1 和 s2 只包含小写英文字母。
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkStrings = function (s1, s2) {
  // 辅助函数: 统计字符串中指定起始下标(0 或 1) 及步长2的字符频次
  const getCounter = (s, start) => {
    const counter = {};
    for (let i = start; i < s.length; i += 2) {
      const ch = s[i];
      counter[ch] = (counter[ch] || 0) + 1;
    }
    return counter;
  };
  // 辅助函数: 比较两个频次对象是否相等
  const isEqualCounter = (c1, c2) => {
    for (let key in c1) {
      if (c1[key] !== (c2[key] || 0)) return false;
    }
    for (let key in c2) {
      if (c2[key] !== (c1[key] || 0)) return false;
    }
    return true;
  };
  // 分别比较偶数位和奇数位的字符频次
  return (
    isEqualCounter(getCounter(s1, 0), getCounter(s2, 0)) &&
    isEqualCounter(getCounter(s1, 1), getCounter(s2, 1))
  );
};

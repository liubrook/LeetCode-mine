// 2278. 字母在字符串中的百分比
// 简单
// 相关标签
// 相关企业
// 提示
// 给你一个字符串 s 和一个字符 letter ，返回在 s 中等于 letter 字符所占的 百分比 ，向下取整到最接近的百分比。



// 示例 1：

// 输入：s = "foobar", letter = "o"
// 输出：33
// 解释：
// 等于字母 'o' 的字符在 s 中占到的百分比是 2 / 6 * 100 % = 33 % ，向下取整，所以返回 33 。
// 示例 2：

// 输入：s = "jjjj", letter = "k"
// 输出：0
// 解释：
// 等于字母 'k' 的字符在 s 中占到的百分比是 0 % ，所以返回 0 。


// 提示：

// 1 <= s.length <= 100
// s 由小写英文字母组成
// letter 是一个小写英文字母

/**
 * @param {string} s
 * @param {character} letter
 * @return {number}
 */
var percentageLetter = function (s, letter) {
  const n = s.length;
  let cnt = 0;
  for (const ch of s) {
    if (ch === letter) cnt++;
  }
  return Math.floor((cnt * 100) / n);
};
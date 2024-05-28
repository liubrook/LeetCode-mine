// 2981. 找出出现至少三次的最长特殊子字符串 I
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个仅由小写英文字母组成的字符串 s 。

// 如果一个字符串仅由单一字符组成，那么它被称为 特殊 字符串。例如，字符串 "abc" 不是特殊字符串，而字符串 "ddd"、"zz" 和 "f" 是特殊字符串。

// 返回在 s 中出现 至少三次 的 最长特殊子字符串 的长度，如果不存在出现至少三次的特殊子字符串，则返回 - 1 。

// 子字符串 是字符串中的一个连续 非空 字符序列。



// 示例 1：

// 输入：s = "aaaa"
// 输出：2
// 解释：出现三次的最长特殊子字符串是 "aa" ：子字符串 "aaaa"、"aaaa" 和 "aaaa"。
// 可以证明最大长度是 2 。
// 示例 2：

// 输入：s = "abcdef"
// 输出：-1
// 解释：不存在出现至少三次的特殊子字符串。因此返回 - 1 。
// 示例 3：

// 输入：s = "abcaba"
// 输出：1
// 解释：出现三次的最长特殊子字符串是 "a" ：子字符串 "abcaba"、"abcaba" 和 "abcaba"。
// 可以证明最大长度是 1 。


// 提示：

// 3 <= s.length <= 50
// s 仅由小写英文字母组成。

/**
 * @param {string} s
 * @return {number}
 */
var maximumLength = function (s) {
  let ans = -1;
  const len = s.length;
  const chs = Array.from({ length: 26 }, () => []);
  let cnt = 0;

  for (let i = 0; i < len; i++) {
    cnt++;
    if (i + 1 === len || s[i] !== s[i + 1]) {
      const ch = s[i].charCodeAt(0) - 'a'.charCodeAt(0);
      chs[ch].push(cnt);
      cnt = 0;
      for (let j = chs[ch].length - 1; j > 0; j--) {
        if (chs[ch][j] > chs[ch][j - 1]) {
          [chs[ch][j], chs[ch][j - 1]] = [chs[ch][j - 1], chs[ch][j]];
        } else {
          break;
        }
      }
      if (chs[ch].length > 3) {
        chs[ch].pop();
      }
    }
  }

  for (let i = 0; i < 26; i++) {
    if (chs[i].length > 0 && chs[i][0] > 2) {
      ans = Math.max(ans, chs[i][0] - 2);
    }
    if (chs[i].length > 1 && chs[i][0] > 1) {
      ans = Math.max(ans, Math.min(chs[i][0] - 1, chs[i][1]));
    }
    if (chs[i].length > 2) {
      ans = Math.max(ans, chs[i][2]);
    }
  }

  return ans;
};
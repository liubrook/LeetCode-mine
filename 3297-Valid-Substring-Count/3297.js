// 3297. 统计重新排列后包含另一个字符串的子字符串数目 I
// 中等
// 相关标签
// 相关企业
// 提示
// 给你两个字符串 word1 和 word2 。

// 如果一个字符串 x 重新排列后，word2 是重排字符串的
// 前缀
//  ，那么我们称字符串 x 是 合法的 。

// 请你返回 word1 中 合法
// 子字符串
// 的数目。



// 示例 1：

// 输入：word1 = "bcca", word2 = "abc"

// 输出：1

// 解释：

// 唯一合法的子字符串是 "bcca" ，可以重新排列得到 "abcc" ，"abc" 是它的前缀。

// 示例 2：

// 输入：word1 = "abcabc", word2 = "abc"

// 输出：10

// 解释：

// 除了长度为 1 和 2 的所有子字符串都是合法的。

// 示例 3：

// 输入：word1 = "abcabc", word2 = "aaabc"

// 输出：0



// 解释：

// 1 <= word1.length <= 10^5
// 1 <= word2.length <= 10^4
// word1 和 word2 都只包含小写英文字母。

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var validSubstringCount = function (word1, word2) {
  const count = Array(26).fill(0);
  for (let c of word2) {
    count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++;
  }
  const n = word1.length;
  const preCount = Array.from({ length: n + 1 }, () => Array(26).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < 26; j++) {
      preCount[i][j] = preCount[i - 1][j];
    }
    preCount[i][word1.charCodeAt(i - 1) - 'a'.charCodeAt(0)]++;
  }
  let res = 0;
  for (let l = 1; l <= n; l++) {
    const r = get(l, n + 1, preCount, count);
    res += n - r + 1;
  }
  return res;
};

const get = (l, r, preCount, count) => {
  let border = l;
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    let f = true;
    for (let i = 0; i < 26; i++) {
      if (preCount[m][i] - preCount[border - 1][i] < count[i]) {
        f = false;
        break;
      }
    }
    if (f) {
      r = m;
    } else {
      l = m + 1;
    }
  }
  return l;
}
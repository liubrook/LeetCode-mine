// 784. 字母大小写全排列
// 给定一个字符串 s ，通过将字符串 s 中的每个字母转变大小写，我们可以获得一个新的字符串。

// 返回 所有可能得到的字符串集合 。以 任意顺序 返回输出。



// 示例 1：

// 输入：s = "a1b2"
// 输出：["a1b2", "a1B2", "A1b2", "A1B2"]
// 示例 2:

// 输入: s = "3z4"
// 输出: ["3z4", "3Z4"]


// 提示:

// 1 <= s.length <= 12
// s 由小写英文字母、大写英文字母和数字组成

/**
 * @param {string} s
 * @return {string[]}
 */
var letterCasePermutation = function (s) {
  const ans = [];
  const q = [""];
  while (q.length !== 0) {
    let cur = q[0];
    const pos = cur.length;
    if (pos === s.length) {
      ans.push(cur);
      q.shift();
    } else {
      if (isLetter(s[pos])) {
        q.push(cur + swapCase(s[pos]));
      }
      q[0] += s[pos];
    }
  }
  return ans;
};

const swapCase = (ch) => {
  if ('a' <= ch && ch <= 'z') {
    return ch.toUpperCase();
  }
  if ('A' <= ch && ch <= 'Z') {
    return ch.toLowerCase();
  }
}

const isLetter = (ch) => {
  return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z';
}
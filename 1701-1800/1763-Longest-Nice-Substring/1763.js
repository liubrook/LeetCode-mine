// 1763. 最长的美好子字符串
// 当一个字符串 s 包含的每一种字母的大写和小写形式 同时 出现在 s 中，就称这个字符串 s 是 美好 字符串。比方说，"abABB" 是美好字符串，因为 'A' 和 'a' 同时出现了，且 'B' 和 'b' 也同时出现了。然而，"abA" 不是美好字符串因为 'b' 出现了，而 'B' 没有出现。

// 给你一个字符串 s ，请你返回 s 最长的 美好子字符串 。如果有多个答案，请你返回 最早 出现的一个。如果不存在美好子字符串，请你返回一个空字符串。



// 示例 1：

// 输入：s = "YazaAay"
// 输出："aAa"
// 解释："aAa" 是一个美好字符串，因为这个子串中仅含一种字母，其小写形式 'a' 和大写形式 'A' 也同时出现了。
// "aAa" 是最长的美好子字符串。
// 示例 2：

// 输入：s = "Bb"
// 输出："Bb"
// 解释："Bb" 是美好字符串，因为 'B' 和 'b' 都出现了。整个字符串也是原字符串的子字符串。
// 示例 3：

// 输入：s = "c"
// 输出：""
// 解释：没有美好子字符串。
// 示例 4：

// 输入：s = "dDzeE"
// 输出："dD"
// 解释："dD" 和 "eE" 都是最长美好子字符串。
// 由于有多个美好子字符串，返回 "dD" ，因为它出现得最早。


// 提示：

// 1 <= s.length <= 100
// s 只包含大写和小写英文字母。

/**
 * @param {string} s
 * @return {string}
 */
var longestNiceSubstring = function (s) {
  this.maxPos = 0;
  this.maxLen = 0;

  let types = 0;
  for (let i = 0; i < s.length; ++i) {
    types |= 1 << (s[i].toLowerCase().charCodeAt() - 'a'.charCodeAt());
  }
  types = bitCount(types);
  for (let i = 1; i <= types; ++i) {
    check(s, i);
  }
  return s.slice(maxPos, maxPos + maxLen);
};

const check = (s, typeNum) => {
  const lowerCnt = new Array(26).fill(0);
  const upperCnt = new Array(26).fill(0);
  let cnt = 0;
  for (let l = 0, r = 0, total = 0; r < s.length; ++r) {
    let idx = s[r].toLowerCase().charCodeAt() - 'a'.charCodeAt();
    if ('a' <= s[r] && s[r] <= 'z') {
      ++lowerCnt[idx];
      if (lowerCnt[idx] === 1 && upperCnt[idx] > 0) {
        ++cnt;
      }
    } else {
      ++upperCnt[idx];
      if (upperCnt[idx] === 1 && lowerCnt[idx] > 0) {
        ++cnt;
      }
    }
    total += (lowerCnt[idx] + upperCnt[idx]) === 1 ? 1 : 0;
    while (total > typeNum) {
      idx = s[l].toLowerCase().charCodeAt() - 'a'.charCodeAt();
      total -= (lowerCnt[idx] + upperCnt[idx]) === 1 ? 1 : 0;
      if ('a' <= s[l] && s[l] <= 'z') {
        --lowerCnt[idx];
        if (lowerCnt[idx] === 0 && upperCnt[idx] > 0) {
          --cnt;
        }
      } else {
        --upperCnt[idx];
        if (upperCnt[idx] === 0 && lowerCnt[idx] > 0) {
          --cnt;
        }
      }
      ++l;
    }
    if (cnt === typeNum && r - l + 1 > maxLen) {
      maxPos = l;
      maxLen = r - l + 1;
    }
  }
}

var bitCount = function (n) {
  let ret = 0;
  while (n) {
    n &= n - 1;
    ret++;
  }
  return ret;
};
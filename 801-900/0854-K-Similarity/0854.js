// 854. 相似度为 K 的字符串
// 对于某些非负整数 k ，如果交换 s1 中两个字母的位置恰好 k 次，能够使结果字符串等于 s2 ，则认为字符串 s1 和 s2 的 相似度为 k 。

// 给你两个字母异位词 s1 和 s2 ，返回 s1 和 s2 的相似度 k 的最小值。



// 示例 1：

// 输入：s1 = "ab", s2 = "ba"
// 输出：1
// 示例 2：

// 输入：s1 = "abc", s2 = "bca"
// 输出：2


// 提示：

// 1 <= s1.length <= 20
// s2.length == s1.length
// s1 和 s2  只包含集合 { 'a', 'b', 'c', 'd', 'e', 'f' } 中的小写字母
// s2 是 s1 的一个字母异位词


/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var kSimilarity = function (s1, s2) {
  let str1 = '';
  let str2 = '';
  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      str1 += s1[i];
      str2 += s2[i];
    }
  }
  const n = str1.length;
  if (n === 0) {
    return 0;
  }
  const smallCycles = [];
  const largeCycles = [];
  for (let i = 1; i < (1 << n); i++) {
    const cnt = new Array(6).fill(0);
    for (let j = 0; j < n; j++) {
      if ((i & (1 << j)) !== 0) {
        cnt[str1[j].charCodeAt() - 'a'.charCodeAt()]++;
        cnt[str2[j].charCodeAt() - 'a'.charCodeAt()]--;
      }
    }
    let isCycle = true;
    for (let j = 0; j < 6; j++) {
      if (cnt[j] !== 0) {
        isCycle = false;
        break;
      }
    }
    if (isCycle) {
      const size = bitCount(i);
      if (size <= 6) {
        smallCycles.push(i);
      } else {
        largeCycles.push(i);
      }
    }
  }
  smallCycles.sort((a, b) => bitCount(a) - bitCount(b));
  largeCycles.sort((a, b) => bitCount(a) - bitCount(b));
  const dp = new Array(1 << n).fill(1);
  dp[0] = 0;
  for (let i = 0; i < smallCycles.length; i++) {
    for (let j = 0; j < i; j++) {
      const x = smallCycles[i], y = smallCycles[j];
      if ((x & y) === y) {
        dp[x] = Math.max(dp[x], dp[y] + dp[x ^ y]);
      }
    }
  }
  for (const x of largeCycles) {
    for (const y of smallCycles) {
      if ((x & y) === y) {
        dp[x] = Math.max(dp[x], dp[y] + dp[x ^ y]);
      }
    }
  }
  return n - dp[(1 << n) - 1];
}

const bitCount = (num) => {
  return num.toString(2).split('0').join('').length;
}
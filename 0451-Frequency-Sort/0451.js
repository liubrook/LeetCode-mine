// 451. 根据字符出现频率排序
// 给定一个字符串，请将字符串里的字符按照出现的频率降序排列。

// 示例 1:

// 输入:
// "tree"

// 输出:
// "eert"

// 解释:
// 'e'出现两次，'r'和't'都只出现一次。
// 因此'e'必须出现在'r'和't'之前。此外，"eetr"也是一个有效的答案。
// 示例 2:

// 输入:
// "cccaaa"

// 输出:
// "cccaaa"

// 解释:
// 'c'和'a'都出现三次。此外，"aaaccc"也是有效的答案。
// 注意"cacaca"是不正确的，因为相同的字母必须放在一起。
// 示例 3:

// 输入:
// "Aabb"

// 输出:
// "bbAa"

// 解释:
// 此外，"bbaA"也是一个有效的答案，但"Aabb"是不正确的。
// 注意'A'和'a'被认为是两种不同的字符。

/**
 * @param {string} s
 * @return {string}
 */
var frequencySort = function (s) {
  const mp = new Map();
  let maxFreq = 0;
  const length = s.length;
  for (const ch of s) {
    const frequency = (mp.get(ch) || 0) + 1;
    mp.set(ch, frequency);
    maxFreq = Math.max(maxFreq, frequency);
  }
  const buckets = new Array(maxFreq + 1).fill(0).map(() => new Array());
  for (const [ch, num] of mp.entries()) {
    buckets[num].push(ch);
  }
  const ret = [];
  for (let i = maxFreq; i > 0; i--) {
    const bucket = buckets[i];
    for (const ch of bucket) {
      for (let k = 0; k < i; k++) {
        ret.push(ch);
      }
    }
  }
  return ret.join('');
}
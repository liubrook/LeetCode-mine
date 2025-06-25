// 2516. 每种字符至少取 K 个
// 中等
// 相关标签
// 相关企业
// 提示
// 给你一个由字符 'a'、'b'、'c' 组成的字符串 s 和一个非负整数 k 。每分钟，你可以选择取走 s 最左侧 还是 最右侧 的那个字符。

// 你必须取走每种字符 至少 k 个，返回需要的 最少 分钟数；如果无法取到，则返回 - 1 。



// 示例 1：

// 输入：s = "aabaaaacaabc", k = 2
// 输出：8
// 解释：
// 从 s 的左侧取三个字符，现在共取到两个字符 'a' 、一个字符 'b' 。
// 从 s 的右侧取五个字符，现在共取到四个字符 'a' 、两个字符 'b' 和两个字符 'c' 。
// 共需要 3 + 5 = 8 分钟。
// 可以证明需要的最少分钟数是 8 。
// 示例 2：

// 输入：s = "a", k = 1
// 输出：-1
// 解释：无法取到一个字符 'b' 或者 'c'，所以返回 - 1 。


// 提示：

// 1 <= s.length <= 10^5
// s 仅由字母 'a'、'b'、'c' 组成
// 0 <= k <= s.length

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var takeCharacters = function (s, k) {
  const cnt = [0, 0, 0];
  const len = s.length;
  let ans = len;

  for (let i = 0; i < len; i++) {
    cnt[s.charCodeAt(i) - 97]++;
  }

  if (cnt[0] >= k && cnt[1] >= k && cnt[2] >= k) {
    ans = Math.min(ans, len);
  } else {
    return -1;
  }

  let l = 0;
  for (let r = 0; r < len; r++) {
    cnt[s.charCodeAt(r) - 97]--;
    while (l < r && (cnt[0] < k || cnt[1] < k || cnt[2] < k)) {
      cnt[s.charCodeAt(l) - 97]++;
      l++;
    }
    if (cnt[0] >= k && cnt[1] >= k && cnt[2] >= k) {
      ans = Math.min(ans, len - (r - l + 1));
    }
  }

  return ans;
};
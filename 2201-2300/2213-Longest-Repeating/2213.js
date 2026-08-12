// 2213. 由单个字符重复的最长子字符串
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个下标从 0 开始的字符串 s 。另给你一个下标从 0 开始、长度为 k 的字符串 queryCharacters ，一个下标从 0 开始、长度也是 k 的整数 下标 数组 queryIndices ，这两个都用来描述 k 个查询。

// 第 i 个查询会将 s 中位于下标 queryIndices[i] 的字符更新为 queryCharacters[i] 。

// 返回一个长度为 k 的数组 lengths ，其中 lengths[i] 是在执行第 i 个查询 之后 s 中仅由 单个字符重复 组成的 最长子字符串 的 长度 。

// 示例 1：

// 输入：s = "babacc", queryCharacters = "bcb", queryIndices = [1,3,3]
// 输出：[3,3,4]
// 解释：
// - 第 1 次查询更新后 s = "bbbacc" 。由单个字符重复组成的最长子字符串是 "bbb" ，长度为 3 。
// - 第 2 次查询更新后 s = "bbbccc" 。由单个字符重复组成的最长子字符串是 "bbb" 或 "ccc"，长度为 3 。
// - 第 3 次查询更新后 s = "bbbbcc" 。由单个字符重复组成的最长子字符串是 "bbbb" ，长度为 4 。
// 因此，返回 [3,3,4] 。
// 示例 2：

// 输入：s = "abyzz", queryCharacters = "aa", queryIndices = [2,1]
// 输出：[2,3]
// 解释：
// - 第 1 次查询更新后 s = "abazz" 。由单个字符重复组成的最长子字符串是 "zz" ，长度为 2 。
// - 第 2 次查询更新后 s = "aaazz" 。由单个字符重复组成的最长子字符串是 "aaa" ，长度为 3 。
// 因此，返回 [2,3] 。

// 提示：

// 1 <= s.length <= 10^5
// s 由小写英文字母组成
// k == queryCharacters.length == queryIndices.length
// 1 <= k <= 10^5
// queryCharacters 由小写英文字母组成
// 0 <= queryIndices[i] < s.length
/**
 * @param {string} s
 * @param {string} queryCharacters
 * @param {number[]} queryIndices
 * @return {number[]}
 */
var longestRepeating = function (s, queryCharacters, queryIndices) {
  const n = s.length;
  const pre = new Array(4 * n).fill(0);
  const suf = new Array(4 * n).fill(0);
  const maxLen = new Array(4 * n).fill(0);
  const leftChar = new Array(4 * n).fill("");
  const rightChar = new Array(4 * n).fill("");

  const pushUp = (u, l, r) => {
    const mid = (l + r) >> 1;
    const leftLen = mid - l + 1,
      rightLen = r - mid;
    const left = u << 1,
      right = (u << 1) | 1;
    leftChar[u] = leftChar[left];
    rightChar[u] = rightChar[right];
    pre[u] = pre[left];
    if (pre[left] === leftLen && rightChar[left] === leftChar[right]) {
      pre[u] = pre[left] + pre[right];
    }
    suf[u] = suf[right];
    if (suf[right] === rightLen && rightChar[left] === leftChar[right]) {
      suf[u] = suf[right] + suf[left];
    }
    maxLen[u] = Math.max(maxLen[left], maxLen[right]);
    if (rightChar[left] === leftChar[right]) {
      maxLen[u] = Math.max(maxLen[u], suf[left] + pre[right]);
    }
  };

  const build = (u, l, r) => {
    if (l === r) {
      pre[u] = 1;
      suf[u] = 1;
      maxLen[u] = 1;
      leftChar[u] = s[l];
      rightChar[u] = s[l];
      return;
    }
    const mid = (l + r) >> 1;
    build(u << 1, l, mid);
    build((u << 1) | 1, mid + 1, r);
    pushUp(u, l, r);
  };

  const update = (u, l, r, pos, ch) => {
    if (l === r) {
      leftChar[u] = ch;
      rightChar[u] = ch;
      return;
    }
    const mid = (l + r) >> 1;
    if (pos <= mid) {
      update(u << 1, l, mid, pos, ch);
    } else {
      update((u << 1) | 1, mid + 1, r, pos, ch);
    }
    pushUp(u, l, r);
  };

  build(1, 0, n - 1);
  const k = queryIndices.length;
  const ans = new Array(k);
  for (let i = 0; i < k; i++) {
    update(1, 0, n - 1, queryIndices[i], queryCharacters[i]);
    ans[i] = maxLen[1];
  }
  return ans;
};

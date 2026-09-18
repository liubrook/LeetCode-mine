// 1520. 最多的不重叠子字符串
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个只包含小写字母的字符串 s ，你需要找到 s 中最多数目的非空子字符串，满足如下条件：

// 这些字符串之间互不重叠，也就是说对于任意两个子字符串 s[i..j] 和 s[x..y] ，要么 j < x 要么 i > y 。
// 如果一个子字符串包含字符 char ，那么 s 中所有 char 字符都应该在这个子字符串中。
// 请你找到满足上述条件的最多子字符串数目。如果有多个解法有相同的子字符串数目，请返回这些子字符串总长度最小的一个解。可以证明最小总长度解是唯一的。

// 请注意，你可以以 任意 顺序返回最优解的子字符串。

// 示例 1：

// 输入：s = "adefaddaccc"
// 输出：["e","f","ccc"]
// 解释：下面为所有满足第二个条件的子字符串：
// [
//   "adefaddaccc"
//   "adefadda",
//   "ef",
//   "e",
//   "f",
//   "ccc",
// ]
// 如果我们选择第一个字符串，那么我们无法再选择其他任何字符串，所以答案为 1 。如果我们选择 "adefadda" ，剩下子字符串中我们只可以选择 "ccc" ，它是唯一不重叠的子字符串，所以答案为 2 。同时我们可以发现，选择 "ef" 不是最优的，因为它可以被拆分成 2 个子字符串。所以最优解是选择 ["e","f","ccc"] ，答案为 3 。不存在别的相同数目子字符串解。
// 示例 2：

// 输入：s = "abbaccd"
// 输出：["d","bb","cc"]
// 解释：注意到解 ["d","abba","cc"] 答案也为 3 ，但它不是最优解，因为它的总长度更长。

// 提示：

// 1 <= s.length <= 10^5
// s 只包含小写英文字母。
/**
 * @param {string} s
 * @return {string[]}
 */
var maxNumOfSubstrings = function (s) {
  // 记录每个字符的第一次和最后一次出现位置
  const pos = new Map();

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (!pos.has(ch)) {
      pos.set(ch, [i, i]);
    } else {
      pos.get(ch)[1] = i;
    }
  }

  // 所有合法的区间
  const valid = [];

  for (const [c, range] of pos) {
    let l = range[0],
      r = range[1];
    let nl = l,
      nr = l;

    while (nl >= l || nr <= r) {
      const i = nl >= l ? nl : nr;

      // 当前处理的是字符 s[i]
      const l_t = pos.get(s[i])[0];
      const r_t = pos.get(s[i])[1];

      // 当前区间左侧还有该字符，需要向左扩展
      if (l_t < l) {
        l = l_t;
      }

      // 当前区间右侧还有该字符，需要向右扩展
      if (r_t > r) {
        r = r_t;
      }

      // 当前处理的是左指针
      if (i === nl) {
        nl--;
      }

      // 当前处理的是右指针
      if (i === nr) {
        nr++;
      }
    }

    valid.push([l, r]);
  }

  // 按右端点升序排序
  valid.sort((a, b) => a[1] - b[1]);

  // 贪心选择互不重叠的区间
  const ans = [];
  let end = -1;

  for (const [left, right] of valid) {
    if (left > end) {
      ans.push(s.substring(left, right + 1));
      end = right;
    }
  }

  return ans;
};

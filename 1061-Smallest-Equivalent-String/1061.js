// 1061. 按字典序排列最小的等效字符串
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给出长度相同的两个字符串s1 和 s2 ，还有一个字符串 baseStr 。

// 其中  s1[i] 和 s2[i]  是一组等价字符。

// 举个例子，如果 s1 = "abc" 且 s2 = "cde"，那么就有 'a' == 'c', 'b' == 'd', 'c' == 'e'。
// 等价字符遵循任何等价关系的一般规则：

// 自反性 ：'a' == 'a'
// 对称性 ：'a' == 'b' 则必定有 'b' == 'a'
// 传递性 ：'a' == 'b' 且 'b' == 'c' 就表明 'a' == 'c'
// 例如， s1 = "abc" 和 s2 = "cde" 的等价信息和之前的例子一样，那么 baseStr = "eed", "acd" 或 "aab"，这三个字符串都是等价的，而 "aab" 是 baseStr 的按字典序最小的等价字符串

// 利用 s1 和 s2 的等价信息，找出并返回 baseStr 的按字典序排列最小的等价字符串。



// 示例 1：

// 输入：s1 = "parker", s2 = "morris", baseStr = "parser"
// 输出："makkek"
// 解释：根据 A 和 B 中的等价信息，我们可以将这些字符分为[m, p], [a, o], [k, r, s], [e, i] 共 4 组。每组中的字符都是等价的，并按字典序排列。所以答案是 "makkek"。
// 示例 2：

// 输入：s1 = "hello", s2 = "world", baseStr = "hold"
// 输出："hdld"
// 解释：根据 A 和 B 中的等价信息，我们可以将这些字符分为[h, w], [d, e, o], [l, r] 共 3 组。所以只有 S 中的第二个字符 'o' 变成 'd'，最后答案为 "hdld"。
// 示例 3：

// 输入：s1 = "leetcode", s2 = "programs", baseStr = "sourcecode"
// 输出："aauaaaaada"
// 解释：我们可以把 A 和 B 中的等价字符分为[a, o, e, r, s, c], [l, p], [g, t] 和[d, m] 共 4 组，因此 S 中除了 'u' 和 'd' 之外的所有字母都转化成了 'a'，最后答案为 "aauaaaaada"。


// 提示：

// 1 <= s1.length, s2.length, baseStr <= 1000
// s1.length == s2.length
// 字符串s1, s2, and baseStr 仅由从 'a' 到 'z' 的小写英文字母组成。

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} baseStr
 * @return {string}
 */
var smallestEquivalentString = function (s1, s2, baseStr) {
  const uf = new UnionFind(26);
  for (let i = 0; i < s1.length; i++) {
    uf.unite(s1.charCodeAt(i) - 97, s2.charCodeAt(i) - 97);
  }
  return [...baseStr].map(c =>
    String.fromCharCode(uf.find(c.charCodeAt(0) - 97) + 97)
  ).join('');
}
class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
  }

  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  unite(x, y) {
    x = this.find(x);
    y = this.find(y);
    if (x === y) {
      return;
    }
    if (x > y) {
      [x, y] = [y, x];
    }
    // 总是让字典序更小的作为集合代表字符
    this.parent[y] = x;
  }
}
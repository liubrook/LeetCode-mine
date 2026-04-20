// 1722. 执行交换操作后的最小汉明距离
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你两个整数数组 source 和 target ，长度都是 n 。还有一个数组 allowedSwaps ，其中每个 allowedSwaps[i] = [ai, bi] 表示你可以交换数组 source 中下标为 ai 和 bi（下标从 0 开始）的两个元素。注意，你可以按 任意 顺序 多次 交换一对特定下标指向的元素。

// 相同长度的两个数组 source 和 target 间的 汉明距离 是元素不同的下标数量。形式上，其值等于满足 source[i] != target[i] （下标从 0 开始）的下标 i（0 <= i <= n-1）的数量。

// 在对数组 source 执行 任意 数量的交换操作后，返回 source 和 target 间的 最小汉明距离 。

// 示例 1：

// 输入：source = [1,2,3,4], target = [2,1,4,5], allowedSwaps = [[0,1],[2,3]]
// 输出：1
// 解释：source 可以按下述方式转换：
// - 交换下标 0 和 1 指向的元素：source = [2,1,3,4]
// - 交换下标 2 和 3 指向的元素：source = [2,1,4,3]
// source 和 target 间的汉明距离是 1 ，二者有 1 处元素不同，在下标 3 。
// 示例 2：

// 输入：source = [1,2,3,4], target = [1,3,2,4], allowedSwaps = []
// 输出：2
// 解释：不能对 source 执行交换操作。
// source 和 target 间的汉明距离是 2 ，二者有 2 处元素不同，在下标 1 和下标 2 。
// 示例 3：

// 输入：source = [5,1,2,4,3], target = [1,5,4,2,3], allowedSwaps = [[0,4],[4,2],[1,3],[1,4]]
// 输出：0

// 提示：

// n == source.length == target.length
// 1 <= n <= 10^5
// 1 <= source[i], target[i] <= 10^5
// 0 <= allowedSwaps.length <= 10^5
// allowedSwaps[i].length == 2
// 0 <= ai, bi <= n - 1
// ai != bi
/**
 * @param {number[]} source
 * @param {number[]} target
 * @param {number[][]} allowedSwaps
 * @return {number}
 */
class UnionFind {
  constructor(n) {
    this.fa = new Array(n);
    this.rank = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      this.fa[i] = i;
    }
  }

  find(x) {
    if (this.fa[x] !== x) {
      this.fa[x] = this.find(this.fa[x]);
    }
    return this.fa[x];
  }

  union(x, y) {
    x = this.find(x);
    y = this.find(y);
    if (x === y) return;
    if (this.rank[x] < this.rank[y]) {
      [x, y] = [y, x];
    }
    this.fa[y] = x;
    if (this.rank[x] === this.rank[y]) {
      this.rank[x]++;
    }
  }
}

var minimumHammingDistance = function (source, target, allowedSwaps) {
  const n = source.length;
  const uf = new UnionFind(n);

  for (const [a, b] of allowedSwaps) {
    uf.union(a, b);
  }

  const sets = new Map();
  for (let i = 0; i < n; i++) {
    const f = uf.find(i);
    if (!sets.has(f)) {
      sets.set(f, new Map());
    }
    const cnt = sets.get(f);
    cnt.set(source[i], (cnt.get(source[i]) || 0) + 1);
  }

  let ans = 0;
  for (let i = 0; i < n; i++) {
    const f = uf.find(i);
    const cnt = sets.get(f);
    const count = cnt.get(target[i]) || 0;
    if (count > 0) {
      cnt.set(target[i], count - 1);
    } else {
      ans++;
    }
  }
  return ans;
};

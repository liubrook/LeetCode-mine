// 1632. 矩阵转换后的秩
// 给你一个 m x n 的矩阵 matrix ，请你返回一个新的矩阵 answer ，其中 answer[row][col] 是 matrix[row][col] 的秩。

// 每个元素的 秩 是一个整数，表示这个元素相对于其他元素的大小关系，它按照如下规则计算：

// 秩是从 1 开始的一个整数。
// 如果两个元素 p 和 q 在 同一行 或者 同一列 ，那么：
// 如果 p < q ，那么 rank(p) < rank(q)
// 如果 p == q ，那么 rank(p) == rank(q)
// 如果 p > q ，那么 rank(p) > rank(q)
// 秩 需要越 小 越好。
// 题目保证按照上面规则 answer 数组是唯一的。



// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/10/25/rank1.jpg
// 输入：matrix = [[1, 2], [3, 4]]
// 输出：[[1, 2], [2, 3]]
// 解释：
// matrix[0][0] 的秩为 1 ，因为它是所在行和列的最小整数。
// matrix[0][1] 的秩为 2 ，因为 matrix[0][1] > matrix[0][0] 且 matrix[0][0] 的秩为 1 。
// matrix[1][0] 的秩为 2 ，因为 matrix[1][0] > matrix[0][0] 且 matrix[0][0] 的秩为 1 。
// matrix[1][1] 的秩为 3 ，因为 matrix[1][1] > matrix[0][1]， matrix[1][1] > matrix[1][0] 且 matrix[0][1] 和 matrix[1][0] 的秩都为 2 。
// 示例 2：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/10/25/rank2.jpg
// 输入：matrix = [[7, 7], [7, 7]]
// 输出：[[1, 1], [1, 1]]
// 示例 3：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/10/25/rank3.jpg
// 输入：matrix = [[20, -21, 14], [-19, 4, 19], [22, -47, 24], [-19, 4, 19]]
// 输出：[[4, 2, 3], [1, 3, 4], [5, 1, 6], [1, 3, 4]]
// 示例 4：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/10/25/rank4.jpg
// 输入：matrix = [[7, 3, 6], [1, 4, 5], [9, 8, 2]]
// 输出：[[5, 1, 4], [1, 2, 3], [6, 3, 1]]


// 提示：

// m == matrix.length
// n == matrix[i].length
// 1 <= m, n <= 500
//   - 10^9 <= matrix[row][col] <= 10^9


/**
 * @param {number[][]} matrix
 * @return {number[][]}
 */
var matrixRankTransform = function (matrix) {
  const m = matrix.length, n = matrix[0].length;
  const uf = new UnionFind(m, n);
  for (let i = 0; i < m; i++) {
    const num2indexList = new Map();
    for (let j = 0; j < n; j++) {
      const num = matrix[i][j];
      if (!num2indexList.has(num)) {
        num2indexList.set(num, []);
      }
      num2indexList.get(num).push([i, j]);
    }
    for (const indexList of num2indexList.values()) {
      const arr1 = indexList[0];
      const i1 = arr1[0], j1 = arr1[1];
      for (let k = 1; k < indexList.length; k++) {
        const arr2 = indexList[k];
        const i2 = arr2[0], j2 = arr2[1];
        uf.union(i1, j1, i2, j2);
      }
    }
  }
  for (let j = 0; j < n; j++) {
    const num2indexList = new Map();
    for (let i = 0; i < m; i++) {
      const num = matrix[i][j];
      if (!num2indexList.has(num)) {
        num2indexList.set(num, []);
      }

      num2indexList.get(num).push([i, j]);
    }
    for (const indexList of num2indexList.values()) {
      const arr1 = indexList[0];
      const i1 = arr1[0], j1 = arr1[1];
      for (let k = 1; k < indexList.length; k++) {
        const arr2 = indexList[k];
        const i2 = arr2[0], j2 = arr2[1];
        uf.union(i1, j1, i2, j2);
      }
    }
  }

  const degree = new Array(m).fill(0).map(() => new Array(n).fill(0));
  const adj = new Map();
  for (let i = 0; i < m; i++) {
    const num2index = new Map();
    for (let j = 0; j < n; j++) {
      const num = matrix[i][j];
      num2index.set(num, [i, j]);
    }
    const sortedArray = [...num2index.keys()];
    sortedArray.sort((a, b) => a - b);
    for (let k = 1; k < sortedArray.length; k++) {
      const prev = num2index.get(sortedArray[k - 1]);
      const curr = num2index.get(sortedArray[k]);
      const i1 = prev[0], j1 = prev[1], i2 = curr[0], j2 = curr[1];
      const root1 = uf.find(i1, j1);
      const root2 = uf.find(i2, j2);
      const ri1 = root1[0], rj1 = root1[1], ri2 = root2[0], rj2 = root2[1];
      degree[ri2][rj2]++;
      if (!adj.has(ri1 * n + rj1)) {
        adj.set(ri1 * n + rj1, []);
      }
      adj.get(ri1 * n + rj1).push([ri2, rj2]);
    }
  }
  for (let j = 0; j < n; j++) {
    const num2index = new Map();
    for (let i = 0; i < m; i++) {
      const num = matrix[i][j];
      num2index.set(num, [i, j]);
    }
    const sortedArray = [...num2index.keys()];
    sortedArray.sort((a, b) => a - b);
    for (let k = 1; k < sortedArray.length; k++) {
      const prev = num2index.get(sortedArray[k - 1]);
      const curr = num2index.get(sortedArray[k]);
      const i1 = prev[0], j1 = prev[1], i2 = curr[0], j2 = curr[1];
      const root1 = uf.find(i1, j1);
      const root2 = uf.find(i2, j2);
      const ri1 = root1[0], rj1 = root1[1], ri2 = root2[0], rj2 = root2[1];
      degree[ri2][rj2]++;
      if (!adj.has(ri1 * n + rj1)) {
        adj.set(ri1 * n + rj1, []);
      }
      adj.get(ri1 * n + rj1).push([ri2, rj2]);
    }
  }

  const rootSet = new Set();
  const ranks = new Array(m).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const rootArr = uf.find(i, j);
      const ri = rootArr[0], rj = rootArr[1];
      rootSet.add(ri * n + rj);
      ranks[ri][rj] = 1;
    }
  }
  const queue = [];
  for (const val of rootSet) {
    if (degree[Math.floor(val / n)][val % n] === 0) {
      queue.push([Math.floor(val / n), val % n]);
    }
  }
  while (queue.length) {
    const arr = queue.shift();
    const i = arr[0], j = arr[1];
    for (const adjArr of (adj.get(i * n + j) || [])) {
      const ui = adjArr[0], uj = adjArr[1];
      degree[ui][uj]--;
      if (degree[ui][uj] === 0) {
        queue.push([ui, uj]);
      }
      ranks[ui][uj] = Math.max(ranks[ui][uj], ranks[i][j] + 1);
    }
  }

  const res = new Array(m).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const rootArr = uf.find(i, j);
      const ri = rootArr[0], rj = rootArr[1];
      res[i][j] = ranks[ri][rj];
    }
  }
  return res;
};
class UnionFind {
  constructor(m, n) {
    this.m = m;
    this.n = n;
    this.root = new Array(m).fill(0).map(() => new Array(n).fill(0).map(() => new Array(2).fill(0)));
    this.size = new Array(m).fill(0).map(() => new Array(n).fill(0));
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        this.root[i][j][0] = i;
        this.root[i][j][1] = j;
        this.size[i][j] = 1;
      }
    }
  }

  find(i, j) {
    const rootArr = this.root[i][j];
    const ri = rootArr[0], rj = rootArr[1];
    if (ri === i && rj === j) {
      return rootArr;
    }
    return this.find(ri, rj);
  }

  union(i1, j1, i2, j2) {
    const rootArr1 = this.find(i1, j1);
    const rootArr2 = this.find(i2, j2);
    const ri1 = rootArr1[0], rj1 = rootArr1[1];
    const ri2 = rootArr2[0], rj2 = rootArr2[1];
    if (ri1 !== ri2 || rj1 !== rj2) {
      if (this.size[ri1][rj1] >= this.size[ri2][rj2]) {
        this.root[ri2][rj2][0] = ri1;
        this.root[ri2][rj2][1] = rj1;
        this.size[ri1][rj1] += this.size[ri2][rj2];
      } else {
        this.root[ri1][rj1][0] = ri2;
        this.root[ri1][rj1][1] = rj2;
        this.size[ri2][rj2] += this.size[ri1][rj1];
      }
    }
  }
}
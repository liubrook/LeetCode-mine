// 959. 由斜杠划分区域
// 在由 1 x 1 方格组成的 N x N 网格 grid 中，每个 1 x 1 方块由 /、\ 或空格构成。这些字符会将方块划分为一些共边的区域。

// （请注意，反斜杠字符是转义的，因此 \ 用 "\\" 表示。）。

// 返回区域的数目。

 

// 示例 1：

// 输入：
// [
//   " /",
//   "/ "
// ]
// 输出：2
// 解释：2x2 网格如下：

// 示例 2：

// 输入：
// [
//   " /",
//   "  "
// ]
// 输出：1
// 解释：2x2 网格如下：

// 示例 3：

// 输入：
// [
//   "\\/",
//   "/\\"
// ]
// 输出：4
// 解释：（回想一下，因为 \ 字符是转义的，所以 "\\/" 表示 \/，而 "/\\" 表示 /\。）
// 2x2 网格如下：

// 示例 4：

// 输入：
// [
//   "/\\",
//   "\\/"
// ]
// 输出：5
// 解释：（回想一下，因为 \ 字符是转义的，所以 "/\\" 表示 /\，而 "\\/" 表示 \/。）
// 2x2 网格如下：

// 示例 5：

// 输入：
// [
//   "//",
//   "/ "
// ]
// 输出：3
// 解释：2x2 网格如下：

 

// 提示：

// 1 <= grid.length == grid[0].length <= 30
// grid[i][j] 是 '/'、'\'、或 ' '。

const find = (f, x) => {
  if (f[x] === x) {
    return x;
  }
  const fa = find(f, f[x]);
  f[x] = fa;
  return fa;
}

const merge = (f, x, y) => {
  const fx = find(f, x);
  const fy = find(f, y);
  f[fx] = fy;
}

var regionsBySlashes = function(grid) {
  const n = grid.length;
  const f = new Array(n * n * 4).fill(0).map((element, index) => index);
  for(let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const idx = i * n + j;
      if (i < n - 1) {
        const bottom = idx + n;
        merge(f, idx * 4 + 2, bottom * 4);
      }
      if (j < n - 1) {
        const right = idx + 1;
        merge(f, idx * 4 + 1, right * 4 + 3);
      }
      if (grid[i][j] === '/') {
        merge(f, idx * 4, idx * 4 + 3);
        merge(f, idx * 4 + 1, idx * 4 + 2);
      } else if (grid[i].charAt(j) == '\\') {
        merge(f, idx * 4, idx * 4 + 1);
        merge(f, idx * 4 + 2, idx * 4 + 3);
      } else {
        merge(f, idx * 4, idx * 4 + 1);
        merge(f, idx * 4 + 1, idx * 4 + 2);
        merge(f, idx * 4 + 2, idx * 4 + 3);
      }
    }
  }

  const fathers = new Set();
  for (let i = 0; i < n * n * 4; i++) {
    const fa = find(f, i);
    fathers.add(fa);
  }
  return [...fathers].length;
}
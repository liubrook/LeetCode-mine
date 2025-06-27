// 2661. 找出叠涂元素
// 提示
// 中等
// 54
// 相关企业
// 给你一个下标从 0 开始的整数数组 arr 和一个 m x n 的整数 矩阵 mat 。arr 和 mat 都包含范围[1，m * n] 内的 所有 整数。

// 从下标 0 开始遍历 arr 中的每个下标 i ，并将包含整数 arr[i] 的 mat 单元格涂色。

// 请你找出 arr 中在 mat 的某一行或某一列上都被涂色且下标最小的元素，并返回其下标 i 。



// 示例 1：

// https://assets.leetcode.com/uploads/2023/01/18/grid1.jpg
// 输入：arr = [1, 3, 4, 2], mat = [[1, 4], [2, 3]]
// 输出：2
// 解释：遍历如上图所示，arr[2] 在矩阵中的第一行或第二列上都被涂色。
// 示例 2：

// https://assets.leetcode.com/uploads/2023/01/18/grid2.jpg
// 输入：arr = [2, 8, 7, 4, 1, 3, 5, 6, 9], mat = [[3, 2, 5], [1, 4, 6], [8, 7, 9]]
// 输出：3
// 解释：遍历如上图所示，arr[3] 在矩阵中的第二列上都被涂色。


// 提示：

// m == mat.length
// n = mat[i].length
// arr.length == m * n
// 1 <= m, n <= 10^5
// 1 <= m * n <= 10^5
// 1 <= arr[i], mat[r][c] <= m * n
// arr 中的所有整数 互不相同
// mat 中的所有整数 互不相同

/**
 * @param {number[]} arr
 * @param {number[][]} mat
 * @return {number}
 */
var firstCompleteIndex = function (arr, mat) {
  let n = mat.length, m = mat[0].length;
  let mp = new Map();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      mp.set(mat[i][j], [i, j]);
    }
  }
  let rowCnt = new Array(n).fill(0);
  let colCnt = new Array(m).fill(0);
  for (let i = 0; i < arr.length; i++) {
    let v = mp.get(arr[i]);
    rowCnt[v[0]]++;
    if (rowCnt[v[0]] == m) {
      return i;
    }
    colCnt[v[1]]++;
    if (colCnt[v[1]] == n) {
      return i;
    }
  }
  return -1;
};
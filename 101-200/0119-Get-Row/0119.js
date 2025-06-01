// 119. 杨辉三角 II
// 简单
// 相关标签
// 相关企业
// 给定一个非负索引 rowIndex，返回「杨辉三角」的第 rowIndex 行。

// 在「杨辉三角」中，每个数是它左上方和右上方的数的和。


// https://pic.leetcode-cn.com/1626927345-DZmfxB-PascalTriangleAnimated2.gif


// 示例 1:

// 输入: rowIndex = 3
// 输出: [1, 3, 3, 1]
// 示例 2:

// 输入: rowIndex = 0
// 输出: [1]
// 示例 3:

// 输入: rowIndex = 1
// 输出: [1, 1]


// 提示:

// 0 <= rowIndex <= 33


// 进阶：

// 你可以优化你的算法到 O(rowIndex) 空间复杂度吗？

/**
 * @param {number} rowIndex
 * @return {number[]}
 */
var getRow = function (rowIndex) {
  const row = new Array(rowIndex + 1).fill(0);
  row[0] = 1;
  for (let i = 1; i <= rowIndex; ++i) {
    for (let j = i; j > 0; --j) {
      row[j] += row[j - 1];
    }
  }
  return row;
};
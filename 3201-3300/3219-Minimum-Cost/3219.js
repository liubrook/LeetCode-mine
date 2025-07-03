// 3219. 切蛋糕的最小总开销 II
// 困难
// 相关标签
// 相关企业
// 提示
// 有一个 m x n 大小的矩形蛋糕，需要切成 1 x 1 的小块。

// 给你整数 m ，n 和两个数组：

// horizontalCut 的大小为 m - 1 ，其中 horizontalCut[i] 表示沿着水平线 i 切蛋糕的开销。
// verticalCut 的大小为 n - 1 ，其中 verticalCut[j] 表示沿着垂直线 j 切蛋糕的开销。
// 一次操作中，你可以选择任意不是 1 x 1 大小的矩形蛋糕并执行以下操作之一：

// 沿着水平线 i 切开蛋糕，开销为 horizontalCut[i] 。
// 沿着垂直线 j 切开蛋糕，开销为 verticalCut[j] 。
// 每次操作后，这块蛋糕都被切成两个独立的小蛋糕。

// 每次操作的开销都为最开始对应切割线的开销，并且不会改变。

// 请你返回将蛋糕全部切成 1 x 1 的蛋糕块的 最小 总开销。



// 示例 1：

// 输入：m = 3, n = 2, horizontalCut = [1, 3], verticalCut = [5]

// 输出：13

// 解释：

// https://assets.leetcode.com/uploads/2024/06/04/ezgifcom-animated-gif-maker-1.gif

// 沿着垂直线 0 切开蛋糕，开销为 5 。
// 沿着水平线 0 切开 3 x 1 的蛋糕块，开销为 1 。
// 沿着水平线 0 切开 3 x 1 的蛋糕块，开销为 1 。
// 沿着水平线 1 切开 2 x 1 的蛋糕块，开销为 3 。
// 沿着水平线 1 切开 2 x 1 的蛋糕块，开销为 3 。
// 总开销为 5 + 1 + 1 + 3 + 3 = 13 。

// 示例 2：

// 输入：m = 2, n = 2, horizontalCut = [7], verticalCut = [4]

// 输出：15

// 解释：

// 沿着水平线 0 切开蛋糕，开销为 7 。
// 沿着垂直线 0 切开 1 x 2 的蛋糕块，开销为 4 。
// 沿着垂直线 0 切开 1 x 2 的蛋糕块，开销为 4 。
// 总开销为 7 + 4 + 4 = 15 。

/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} horizontalCut
 * @param {number[]} verticalCut
 * @return {number}
 */
var minimumCost = function (m, n, horizontalCut, verticalCut) {
  horizontalCut.sort((a, b) => a - b);
  verticalCut.sort((a, b) => a - b);
  let h = 1, v = 1;
  let res = 0;
  while (horizontalCut.length || verticalCut.length) {
    if (!verticalCut.length || (horizontalCut.length && horizontalCut[horizontalCut.length - 1] > verticalCut[verticalCut.length - 1])) {
      res += horizontalCut[horizontalCut.length - 1] * h;
      horizontalCut.pop();
      v++;
    } else {
      res += verticalCut[verticalCut.length - 1] * v;
      verticalCut.pop();
      h++;
    }
  }
  return res;
};
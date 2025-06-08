// 1465. 切割后面积最大的蛋糕
// 提示
// 中等
// 75
// 相关企业
// 矩形蛋糕的高度为 h 且宽度为 w，给你两个整数数组 horizontalCuts 和 verticalCuts，其中：

// horizontalCuts[i] 是从矩形蛋糕顶部到第  i 个水平切口的距离
// verticalCuts[j] 是从矩形蛋糕的左侧到第 j 个竖直切口的距离
// 请你按数组 horizontalCuts 和 verticalCuts 中提供的水平和竖直位置切割后，请你找出 面积最大 的那份蛋糕，并返回其 面积 。由于答案可能是一个很大的数字，因此需要将结果 对 109 + 7 取余 后返回。



// 示例 1：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/30/leetcode_max_area_2.png

// 输入：h = 5, w = 4, horizontalCuts = [1, 2, 4], verticalCuts = [1, 3]
// 输出：4
// 解释：上图所示的矩阵蛋糕中，红色线表示水平和竖直方向上的切口。切割蛋糕后，绿色的那份蛋糕面积最大。
// 示例 2：

// https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/05/30/leetcode_max_area_3.png

// 输入：h = 5, w = 4, horizontalCuts = [3, 1], verticalCuts = [1]
// 输出：6
// 解释：上图所示的矩阵蛋糕中，红色线表示水平和竖直方向上的切口。切割蛋糕后，绿色和黄色的两份蛋糕面积最大。
// 示例 3：

// 输入：h = 5, w = 4, horizontalCuts = [3], verticalCuts = [3]
// 输出：9


// 提示：

// 2 <= h, w <= 10^9
// 1 <= horizontalCuts.length <= min(h - 1, 10^5)
// 1 <= verticalCuts.length <= min(w - 1, 10^5)
// 1 <= horizontalCuts[i] < h
// 1 <= verticalCuts[i] < w
// 题目数据保证 horizontalCuts 中的所有元素各不相同
// 题目数据保证 verticalCuts 中的所有元素各不相同

/**
 * @param {number} h
 * @param {number} w
 * @param {number[]} horizontalCuts
 * @param {number[]} verticalCuts
 * @return {number}
 */
var maxArea = function (h, w, horizontalCuts, verticalCuts) {
  const mod = 1e9 + 7;
  horizontalCuts.sort((a, b) => a - b);
  verticalCuts.sort((a, b) => a - b);
  var calMax = function (arr, boardr) {
    let res = 0, pre = 0;
    for (let i = 0; i < arr.length; i++) {
      res = Math.max(arr[i] - pre, res);
      pre = arr[i];
    }
    return Math.max(res, boardr - pre);
  }
  return BigInt(calMax(horizontalCuts, h)) * BigInt(calMax(verticalCuts, w)) % BigInt(mod);
};
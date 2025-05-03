// 1007. 行相等的最少多米诺旋转
// 中等
// 相关标签
// 相关企业
// 在一排多米诺骨牌中，tops[i] 和 bottoms[i] 分别代表第 i 个多米诺骨牌的上半部分和下半部分。（一个多米诺是两个从 1 到 6 的数字同列平铺形成的 —— 该平铺的每一半上都有一个数字。）

// 我们可以旋转第 i 张多米诺，使得 tops[i] 和 bottoms[i] 的值交换。

// 返回能使 tops 中所有值或者 bottoms 中所有值都相同的最小旋转次数。

// 如果无法做到，返回 - 1.



// 示例 1：

// https://assets.leetcode.com/uploads/2021/05/14/domino.png
// 输入：tops = [2, 1, 2, 4, 2, 2], bottoms = [5, 2, 6, 2, 3, 2]
// 输出：2
// 解释：
// 图一表示：在我们旋转之前， tops 和 bottoms 给出的多米诺牌。
// 如果我们旋转第二个和第四个多米诺骨牌，我们可以使上面一行中的每个值都等于 2，如图二所示。 
// 示例 2：

// 输入：tops = [3, 5, 1, 2, 3], bottoms = [3, 6, 3, 3, 4]
// 输出：-1
// 解释： 在这种情况下，不可能旋转多米诺牌使一行的值相等。


// 提示：

// 2 <= tops.length <= 2 * 10^4
// bottoms.length == tops.length
// 1 <= tops[i], bottoms[i] <= 6


/**
 * @param {number[]} tops
 * @param {number[]} bottoms
 * @return {number}
 */
var minDominoRotations = function (tops, bottoms) {
  const n = tops.length;
  let rotations = check(tops[0], tops, bottoms, n);
  if (rotations !== -1 || tops[0] === bottoms[0]) {
    return rotations;
  }
  return check(bottoms[0], tops, bottoms, n);
};
function check(x, tops, bottoms, n) {
  let rotationsA = 0, rotationsB = 0;
  for (let i = 0; i < n; i++) {
    if (tops[i] !== x && bottoms[i] !== x) {
      return -1;
    } else if (tops[i] !== x) {
      rotationsA++;
    } else if (bottoms[i] !== x) {
      rotationsB++;
    }
  }
  return Math.min(rotationsA, rotationsB);
}
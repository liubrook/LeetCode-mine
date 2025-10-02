// 3100. 换水问题 II
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你两个整数 numBottles 和 numExchange 。

// numBottles 代表你最初拥有的满水瓶数量。在一次操作中，你可以执行以下操作之一：

// 喝掉任意数量的满水瓶，使它们变成空水瓶。
// 用 numExchange 个空水瓶交换一个满水瓶。然后，将 numExchange 的值增加 1 。
// 注意，你不能使用相同的 numExchange 值交换多批空水瓶。例如，如果 numBottles == 3 并且 numExchange == 1 ，则不能用 3 个空水瓶交换成 3 个满水瓶。

// 返回你 最多 可以喝到多少瓶水。



// 示例 1：
// https://assets.leetcode.com/uploads/2024/01/28/exampleone1.png

// 输入：numBottles = 13, numExchange = 6
// 输出：15
// 解释：上表显示了满水瓶的数量、空水瓶的数量、numExchange 的值，以及累计喝掉的水瓶数量。
// 示例 2：
// https://assets.leetcode.com/uploads/2024/01/28/example231.png

// 输入：numBottles = 10, numExchange = 3
// 输出：13
// 解释：上表显示了满水瓶的数量、空水瓶的数量、numExchange 的值，以及累计喝掉的水瓶数量。


// 提示：

// 1 <= numBottles <= 100
// 1 <= numExchange <= 100

/**
 * @param {number} numBottles
 * @param {number} numExchange
 * @return {number}
 */
var maxBottlesDrunk = function (numBottles, numExchange) {
  let ans = numBottles;
  let empty = numBottles;
  while (empty >= numExchange) {
    ans++;
    empty -= numExchange - 1;
    numExchange++;
  }
  return ans;
};
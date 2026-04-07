// 2069. 模拟行走机器人 II
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个在 XY 平面上的 width x height 的网格图，左下角 的格子为 (0, 0) ，右上角 的格子为 (width - 1, height - 1) 。网格图中相邻格子为四个基本方向之一（"North"，"East"，"South" 和 "West"）。一个机器人 初始 在格子 (0, 0) ，方向为 "East" 。

// 机器人可以根据指令移动指定的 步数 。每一步，它可以执行以下操作。

// 沿着当前方向尝试 往前一步 。
// 如果机器人下一步将到达的格子 超出了边界 ，机器人会 逆时针 转 90 度，然后再尝试往前一步。
// 如果机器人完成了指令要求的移动步数，它将停止移动并等待下一个指令。

// 请你实现 Robot 类：

// Robot(int width, int height) 初始化一个 width x height 的网格图，机器人初始在 (0, 0) ，方向朝 "East" 。
// void step(int num) 给机器人下达前进 num 步的指令。
// int[] getPos() 返回机器人当前所处的格子位置，用一个长度为 2 的数组 [x, y] 表示。
// String getDir() 返回当前机器人的朝向，为 "North" ，"East" ，"South" 或者 "West" 。

// 示例 1：

// https://assets.leetcode.com/uploads/2021/10/09/example-1.png

// 输入：
// ["Robot", "step", "step", "getPos", "getDir", "step", "step", "step", "getPos", "getDir"]
// [[6, 3], [2], [2], [], [], [2], [1], [4], [], []]
// 输出：
// [null, null, null, [4, 0], "East", null, null, null, [1, 2], "West"]

// 解释：
// Robot robot = new Robot(6, 3); // 初始化网格图，机器人在 (0, 0) ，朝东。
// robot.step(2);  // 机器人朝东移动 2 步，到达 (2, 0) ，并朝东。
// robot.step(2);  // 机器人朝东移动 2 步，到达 (4, 0) ，并朝东。
// robot.getPos(); // 返回 [4, 0]
// robot.getDir(); // 返回 "East"
// robot.step(2);  // 朝东移动 1 步到达 (5, 0) ，并朝东。
//                 // 下一步继续往东移动将出界，所以逆时针转变方向朝北。
//                 // 然后，往北移动 1 步到达 (5, 1) ，并朝北。
// robot.step(1);  // 朝北移动 1 步到达 (5, 2) ，并朝 北 （不是朝西）。
// robot.step(4);  // 下一步继续往北移动将出界，所以逆时针转变方向朝西。
//                 // 然后，移动 4 步到 (1, 2) ，并朝西。
// robot.getPos(); // 返回 [1, 2]
// robot.getDir(); // 返回 "West"

// 提示：

// 2 <= width, height <= 100
// 1 <= num <= 10^5
// step ，getPos 和 getDir 总共 调用次数不超过 10^4 次。
/**
 * @param {number} width
 * @param {number} height
 */
var Robot = function (width, height) {
  this.w = width;
  this.h = height;
  this.s = 0;
};

/**
 * @param {number} num
 * @return {void}
 */
Robot.prototype.step = function (num) {
  // 由于机器人智能走外圈，那么走(w+h-2)*2步后会回到起点
  // 把s取模调整到 [1, (w + h - 2) * 2], 这样不需要判断s === 0时的方向
  this.s = ((this.s + num - 1) % ((this.w + this.h - 2) * 2)) + 1;
};

Robot.prototype.getState = function () {
  const w = this.w,
    h = this.h,
    s = this.s;
  if (s < w) {
    return [s, 0, "East"];
  } else if (s < w + h - 1) {
    return [w - 1, s - w + 1, "North"];
  } else if (s < w * 2 + h - 2) {
    return [w * 2 + h - s - 3, h - 1, "West"];
  } else {
    return [0, (w + h) * 2 - s - 4, "South"];
  }
};

/**
 * @return {number[]}
 */
Robot.prototype.getPos = function () {
  const [x, y, _] = this.getState();
  return [x, y];
};

/**
 * @return {string}
 */
Robot.prototype.getDir = function () {
  return this.getState()[2];
};

/**
 * Your Robot object will be instantiated and called as such:
 * var obj = new Robot(width, height)
 * obj.step(num)
 * var param_2 = obj.getPos()
 * var param_3 = obj.getDir()
 */

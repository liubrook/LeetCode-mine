// 1344. 时钟指针的夹角
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你两个数 hour 和 minutes 。请你返回在时钟上，由给定时间的时针和分针组成的较小角的角度（60 单位制）。

// 示例 1：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/02/08/sample_1_1673.png

// 输入：hour = 12, minutes = 30
// 输出：165
// 示例 2：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/02/08/sample_2_1673.png

// 输入：hour = 3, minutes = 30
// 输出；75
// 示例 3：

// https://assets.leetcode.cn/aliyun-lc-upload/uploads/2020/02/08/sample_3_1673.png

// 输入：hour = 3, minutes = 15
// 输出：7.5
// 示例 4：

// 输入：hour = 4, minutes = 50
// 输出：155
// 示例 5：

// 输入：hour = 12, minutes = 0
// 输出：0

// 提示：

// 1 <= hour <= 12
// 0 <= minutes <= 59
// 与标准答案误差在 10^-5 以内的结果都被视为正确结果。
/**
 * @param {number} hour
 * @param {number} minutes
 * @return {number}
 */
var angleClock = function (hour, minutes) {
  const one_min_angle = 6;
  const one_hour_angle = 30;

  const minutes_angle = one_min_angle * minutes;
  const hour_angle = ((hour % 12) + minutes / 60) * one_hour_angle;

  const diff = Math.abs(hour_angle - minutes_angle);
  return Math.min(diff, 360 - diff);
};

// LCP 40. 心算挑战
// 简单
// 相关标签
// 相关企业
// 「力扣挑战赛」心算项目的挑战比赛中，要求选手从 N 张卡牌中选出 cnt 张卡牌，若这 cnt 张卡牌数字总和为偶数，则选手成绩「有效」且得分为 cnt 张卡牌数字总和。 给定数组 cards 和 cnt，其中 cards[i] 表示第 i 张卡牌上的数字。 请帮参赛选手计算最大的有效得分。若不存在获取有效得分的卡牌方案，则返回 0。

// 示例 1：

// 输入：cards = [1, 2, 8, 9], cnt = 3

// 输出：18

// 解释：选择数字为 1、8、9 的这三张卡牌，此时可获得最大的有效得分 1 + 8 + 9=18。

// 示例 2：

// 输入：cards = [3, 3, 1], cnt = 1

// 输出：0

// 解释：不存在获取有效得分的卡牌方案。

// 提示：

// 1 <= cnt <= cards.length <= 10 ^ 5
// 1 <= cards[i] <= 1000


/**
 * @param {number[]} cards
 * @param {number} cnt
 * @return {number}
 */
var maxmiumScore = function (cards, cnt) {
  const val = new Array(1005).fill(0);
  for (let card of cards) {
    val[card]++;
  }
  let ans = 0;
  let tmp = 0;
  let ed = -1;
  let odd = -1, even = -1;
  for (let i = 1000; i >= 1; i--) {
    if (val[i] === 0) {
      continue;
    }

    if (val[i] > cnt) {
      tmp += cnt * i;
      cnt = 0;
    } else {
      tmp += val[i] * i;
      cnt -= val[i];
      val[i] = 0;
    }
    if (i % 2 === 1) {
      odd = i;
    } else {
      even = i;
    }
    if (cnt === 0) {
      if (val[i] > 0) {
        ed = i;
      } else {
        ed = i - 1;
      }
      break;
    }
  }

  if (tmp % 2 === 0) {
    return tmp;
  }
  for (let i = ed; i >= 1; i--) {
    if (val[i] === 0) {
      continue;
    }
    if (i % 2 === 1) {
      if (even !== -1) {
        ans = Math.max(ans, tmp - even + i);
      }
    } else {
      if (odd !== -1) {
        ans = Math.max(ans, tmp - odd + i);
      }
    }
  }

  return ans;
};
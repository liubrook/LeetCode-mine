// 679. 24 点游戏
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 给定一个长度为4的整数数组 cards 。你有 4 张卡片，每张卡片上都包含一个范围在[1, 9] 的数字。您应该使用运算符['+', '-', '*', '/'] 和括号 '(' 和 ')' 将这些卡片上的数字排列成数学表达式，以获得值24。

// 你须遵守以下规则:

// 除法运算符 '/' 表示实数除法，而不是整数除法。
// 例如， 4 / (1 - 2 / 3)= 4 / (1 / 3)= 12 。
// 每个运算都在两个数字之间。特别是，不能使用 “-” 作为一元运算符。
// 例如，如果 cards = [1, 1, 1, 1] ，则表达式 “-1 - 1 - 1 - 1” 是 不允许 的。
// 你不能把数字串在一起
// 例如，如果 cards = [1, 2, 1, 2] ，则表达式 “12 + 12” 无效。
// 如果可以得到这样的表达式，其计算结果为 24 ，则返回 true ，否则返回 false 。



// 示例 1:

// 输入: cards = [4, 1, 8, 7]
// 输出: true
// 解释: (8 - 4) * (7 - 1) = 24
// 示例 2:

// 输入: cards = [1, 2, 1, 2]
// 输出: false


// 提示:

// cards.length == 4
// 1 <= cards[i] <= 9

/**
 * @param {number[]} cards
 * @return {boolean}
 */
var judgePoint24 = function (cards) {
  const len = cards.length;
  if (len == 1) { // 递归的出口
    return Math.abs(cards[0] - 24) < 1e-9;
  }
  let isValid = false; // 用于控制是否进入递归
  for (let i = 0; i < len; i++) { // 两层循环，枚举出所有的两数组合
    for (let j = i + 1; j < len; j++) {
      const n1 = cards[i];
      const n2 = cards[j]; // 选出的两个数 n1 n2
      const newCards = []; // 存放剩下的两个数
      for (let k = 0; k < len; k++) {
        if (k !== i && k !== j) { // 剔除掉选出的两个数
          newCards.push(cards[k]);
        }
      }
      // 加
      isValid = isValid || judgePoint24([...newCards, n1 + n2]);
      // 减与被减
      isValid = isValid || judgePoint24([...newCards, n1 - n2]);
      isValid = isValid || judgePoint24([...newCards, n2 - n1]);
      // 乘
      isValid = isValid || judgePoint24([...newCards, n1 * n2]);
      if (n2 !== 0) {
        // 除
        isValid = isValid || judgePoint24([...newCards, n1 / n2]);
      }
      if (n1 !== 0) {
        // 被除
        isValid = isValid || judgePoint24([...newCards, n2 / n1]);
      }
      if (isValid) {
        return true;
      }
    }
  }
  return false; // 遍历结束，始终没有返回真，则返回false
};
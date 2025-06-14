// 1432. 改变一个整数能得到的最大差值
// 中等
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个整数 num 。你可以对它进行以下步骤共计 两次：

// 选择一个数字 x (0 <= x <= 9).
// 选择另一个数字 y (0 <= y <= 9) 。数字 y 可以等于 x 。
// 将 num 中所有出现 x 的数位都用 y 替换。
// 令两次对 num 的操作得到的结果分别为 a 和 b 。

// 请你返回 a 和 b 的 最大差值 。

// 注意，新的整数（a 或 b）必须不能 含有前导 0，并且 非 0。



// 示例 1：

// 输入：num = 555
// 输出：888
// 解释：第一次选择 x = 5 且 y = 9 ，并把得到的新数字保存在 a 中。
// 第二次选择 x = 5 且 y = 1 ，并把得到的新数字保存在 b 中。
// 现在，我们有 a = 999 和 b = 111 ，最大差值为 888
// 示例 2：

// 输入：num = 9
// 输出：8
// 解释：第一次选择 x = 9 且 y = 9 ，并把得到的新数字保存在 a 中。
// 第二次选择 x = 9 且 y = 1 ，并把得到的新数字保存在 b 中。
// 现在，我们有 a = 9 和 b = 1 ，最大差值为 8
// 示例 3：

// 输入：num = 123456
// 输出：820000
// 示例 4：

// 输入：num = 10000
// 输出：80000
// 示例 5：

// 输入：num = 9288
// 输出：8700


// 提示：

// 1 <= num <= 10^8


/**
 * @param {number} num
 * @return {number}
 */
var maxDiff = function (num) {
  // 替换字符串中的字符
  const replace = (s, x, y) => s.split(x).join(y);
  let minNum = num.toString();
  let maxNum = num.toString();
  // 找到一个高位替换成 9
  for (let digit of maxNum) {
    if (digit !== '9') {
      maxNum = replace(maxNum, digit, '9');
      break;
    }
  }

  // 将最高位替换成 1
  // 或者找到一个与最高位不相等的高位替换成 0
  for (let i = 0; i < minNum.length; ++i) {
    let digit = minNum[i];
    if (i === 0) {
      if (digit !== '1') {
        minNum = replace(minNum, digit, '1');
        break;
      }
    } else {
      if (digit !== '0' && digit !== minNum[0]) {
        minNum = replace(minNum, digit, '0');
        break;
      }
    }
  }

  return parseInt(maxNum) - parseInt(minNum);
};
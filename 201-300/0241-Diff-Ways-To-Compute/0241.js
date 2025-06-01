// 241. 为运算表达式设计优先级
// 给你一个由数字和运算符组成的字符串 expression ，按不同优先级组合数字和运算符，计算并返回所有可能组合的结果。你可以 按任意顺序 返回答案。

// 生成的测试用例满足其对应输出值符合 32 位整数范围，不同结果的数量不超过 104 。



// 示例 1：

// 输入：expression = "2-1-1"
// 输出：[0, 2]
// 解释：
// ((2 - 1) - 1) = 0
//   (2 - (1 - 1)) = 2
// 示例 2：

// 输入：expression = "2*3-4*5"
// 输出：[-34, -14, -10, -10, 10]
// 解释：
// (2 * (3 - (4 * 5))) = -34
//   ((2 * 3) - (4 * 5)) = -14
//     ((2 * (3 - 4)) * 5) = -10
//       (2 * ((3 - 4) * 5)) = -10
//         (((2 * 3) - 4) * 5) = 10


// 提示：

// 1 <= expression.length <= 20
// expression 由数字和算符 '+'、'-' 和 '*' 组成。
// 输入表达式中的所有整数值在范围[0, 99] 

/**
 * @param {string} expression
 * @return {number[]}
 */
var diffWaysToCompute = function (expression) {
  const ADDITION = -1;
  const SUBTRACTION = -2;
  const MULTIPLICATION = -3;
  const ops = [];
  for (let i = 0; i < expression.length;) {
    if (!isDigit(expression[i])) {
      if (expression[i] === '+') {
        ops.push(ADDITION);
      } else if (expression[i] === '-') {
        ops.push(SUBTRACTION);
      } else {
        ops.push(MULTIPLICATION);
      }
      i++;
    } else {
      let t = 0;
      while (i < expression.length && isDigit(expression[i])) {
        t = t * 10 + expression[i].charCodeAt() - '0'.charCodeAt();
        i++;
      }
      ops.push(t);
    }
  }
  const dp = new Array(ops.length).fill(0).map(() => new Array(ops.length).fill(0));
  for (let i = 0; i < ops.length; i++) {
    for (let j = 0; j < ops.length; j++) {
      dp[i][j] = [];
    }
  }
  for (let i = 0; i < ops.length; i += 2) {
    dp[i][i].push(ops[i]);
  }
  for (let i = 3; i <= ops.length; i++) {
    for (let j = 0; j + i <= ops.length; j += 2) {
      let l = j;
      let r = j + i - 1;
      for (let k = j + 1; k < r; k += 2) {
        const left = dp[l][k - 1];
        const right = dp[k + 1][r];
        for (const num1 of left) {
          for (const num2 of right) {
            if (ops[k] === ADDITION) {
              dp[l][r].push(num1 + num2);
            } else if (ops[k] === SUBTRACTION) {
              dp[l][r].push(num1 - num2);
            } else if (ops[k] === MULTIPLICATION) {
              dp[l][r].push(num1 * num2);
            }
          }
        }
      }
    }
  }
  return dp[0][ops.length - 1];
};

const isDigit = (ch) => {
  return parseFloat(ch).toString() === "NaN" ? false : true;
}
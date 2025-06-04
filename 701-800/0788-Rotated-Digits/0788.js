// 788. 旋转数字
// 我们称一个数 X 为好数, 如果它的每位数字逐个地被旋转 180 度后，我们仍可以得到一个有效的，且和 X 不同的数。要求每位数字都要被旋转。

// 如果一个数的每位数字被旋转以后仍然还是一个数字， 则这个数是有效的。0, 1, 和 8 被旋转后仍然是它们自己；2 和 5 可以互相旋转成对方（在这种情况下，它们以不同的方向旋转，换句话说，2 和 5 互为镜像）；6 和 9 同理，除了这些以外其他的数字旋转以后都不再是有效的数字。

// 现在我们有一个正整数 N, 计算从 1 到 N 中有多少个数 X 是好数？



// 示例：

// 输入: 10
// 输出: 4
// 解释:
// 在[1, 10]中有四个好数： 2, 5, 6, 9。
// 注意 1 和 10 不是好数, 因为他们在旋转之后不变。


// 提示：

// N 的取值范围是[1, 10000]。

/**
 * @param {number} n
 * @return {number}
 */
var rotatedDigits = function (n) {
  const check = [0, 0, 1, -1, -1, 1, 1, -1, 0, 1];
  const memo = new Array(5).fill(0).map(() => new Array(2).fill(0).map(() => new Array(2).fill(-1)));
  let digits = [];

  const dfs = (pos, bound, diff) => {
    if (pos === digits.length) {
      return diff;
    }
    if (memo[pos][bound][diff] !== -1) {
      return memo[pos][bound][diff];
    }

    let ret = 0;
    for (let i = 0; i <= (bound !== 0 ? digits[pos] : 9); ++i) {
      if (check[i] != -1) {
        ret += dfs(
          pos + 1,
          bound !== 0 && i === digits[pos] ? 1 : 0,
          diff !== 0 || check[i] === 1 ? 1 : 0
        );
      }
    }
    return memo[pos][bound][diff] = ret;
  }

  while (n !== 0) {
    digits.push(n % 10);
    n = Math.floor(n / 10);
  }
  digits = _.reverse(digits);

  const ans = dfs(0, 1, 0);
  return ans;
};
// 829. 连续整数求和
// 给定一个正整数 n，返回 连续正整数满足所有数字之和为 n 的组数 。 



// 示例 1:

// 输入: n = 5
// 输出: 2
// 解释: 5 = 2 + 3，共有两组连续整数([5], [2, 3])求和后为 5。
// 示例 2:

// 输入: n = 9
// 输出: 3
// 解释: 9 = 4 + 5 = 2 + 3 + 4
// 示例 3:

// 输入: n = 15
// 输出: 4
// 解释: 15 = 8 + 7 = 4 + 5 + 6 = 1 + 2 + 3 + 4 + 5


// 提示:

// 1 <= n <= 109​​​​​​​

/**
 * @param {number} n
 * @return {number}
 */
var consecutiveNumbersSum = function (n) {
  let ans = 0;
  const bound = 2 * n;
  for (let k = 1; k * (k + 1) <= bound; k++) {
    if (isKConsecutive(n, k)) {
      ans++;
    }
  }
  return ans;
}

const isKConsecutive = (n, k) => {
  if (k % 2 === 1) {
    return n % k === 0;
  } else {
    return n % k !== 0 && 2 * n % k === 0;
  }
};
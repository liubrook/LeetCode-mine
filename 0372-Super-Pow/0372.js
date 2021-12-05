// 372. 超级次方
// 你的任务是计算 ab 对 1337 取模，a 是一个正整数，b 是一个非常大的正整数且会以数组形式给出。



// 示例 1：

// 输入：a = 2, b = [3]
// 输出：8
// 示例 2：

// 输入：a = 2, b = [1, 0]
// 输出：1024
// 示例 3：

// 输入：a = 1, b = [4, 3, 3, 8, 5, 2]
// 输出：1
// 示例 4：

// 输入：a = 2147483647, b = [2, 0, 0]
// 输出：1198


// 提示：

// 1 <= a <= 231 - 1
// 1 <= b.length <= 2000
// 0 <= b[i] <= 9
// b 不含前导 0

/**
 * @param {number} a
 * @param {number[]} b
 * @return {number}
 */
const MOD = 1337
var superPow = function (a, b) {
  dfs = function (idx) {
    if (idx == -1)
      return 1
    return quickPow(dfs(idx - 1), 10) * quickPow(a, b[idx]) % MOD
  }

  quickPow = function (x, y) {
    let ans = 1
    x %= MOD
    while (y != 0) {
      if ((y & 1) != 0)
        ans = ans * x % MOD
      x = x * x % MOD
      y >>= 1
    }
    return ans
  }

  a %= MOD
  return dfs(b.length - 1)
};
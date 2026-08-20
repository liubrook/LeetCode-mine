// 3116. 单面值组合的第 K 小金额
// 困难
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个整数数组 coins 表示不同面额的硬币，另给你一个整数 k 。

// 你有无限量的每种面额的硬币。但是，你 不能 组合使用不同面额的硬币。

// 返回使用这些硬币能制造的 第 kth 小 金额。

// 示例 1：

// 输入： coins = [3,6,9], k = 3

// 输出： 9

// 解释：给定的硬币可以制造以下金额：
// 3元硬币产生3的倍数：3, 6, 9, 12, 15等。
// 6元硬币产生6的倍数：6, 12, 18, 24等。
// 9元硬币产生9的倍数：9, 18, 27, 36等。
// 所有硬币合起来可以产生：3, 6, 9, 12, 15等。

// 示例 2：

// 输入：coins = [5,2], k = 7

// 输出：12

// 解释：给定的硬币可以制造以下金额：
// 5元硬币产生5的倍数：5, 10, 15, 20等。
// 2元硬币产生2的倍数：2, 4, 6, 8, 10, 12等。
// 所有硬币合起来可以产生：2, 4, 5, 6, 8, 10, 12, 14, 15等。

// 提示：

// 1 <= coins.length <= 15
// 1 <= coins[i] <= 25
// 1 <= k <= 2 * 10^9
// coins 包含两两不同的整数。
/**
 * @param {number[]} coins
 * @param {number} k
 * @return {number}
 */
var findKthSmallest = function (coins, k) {
  coins.sort((a, b) => a - b);
  const newCoins = [];
  for (const x of coins) {
    let flag = true;
    for (const y of newCoins) {
      if (x % y === 0) {
        flag = false;
        break;
      }
    }
    if (flag) {
      newCoins.push(x);
    }
  }
  coins = newCoins;

  const n = coins.length;
  const m = 1 << n;
  const lcm = new Array(m).fill(0n);
  let l = BigInt(k);
  let r = BigInt(coins[0]) * BigInt(k) + 1n;

  const gcd = (a, b) => {
    a = a < 0n ? -a : a;
    b = b < 0n ? -b : b;
    while (b !== 0n) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  const trailingZeros = (x) => {
    let count = 0;
    while ((x & 1) === 0) {
      count++;
      x >>= 1;
    }
    return count;
  };

  const popcount = (x) => {
    let count = 0;
    while (x) {
      count += x & 1;
      x >>= 1;
    }
    return count;
  };

  lcm[0] = 1n;
  for (let mask = 1; mask < m; mask++) {
    const preMask = mask & (mask - 1);
    const i = trailingZeros(mask);

    const coin = BigInt(coins[i]);
    const tmp = lcm[preMask] / gcd(lcm[preMask], coin);
    if (tmp <= r / coin) {
      lcm[mask] = tmp * coin;
    } else {
      lcm[mask] = r + 1n;
    }
  }

  const count = (x) => {
    let res = 0n;
    for (let mask = 1; mask < m; mask++) {
      if (lcm[mask] > x) continue;

      if (popcount(mask) & 1) {
        res += x / lcm[mask];
      } else {
        res -= x / lcm[mask];
      }
    }
    return res;
  };

  while (l < r) {
    const mid = (l + r) / 2n;
    if (count(mid) >= k) {
      r = mid;
    } else {
      l = mid + 1n;
    }
  }
  return Number(l);
};

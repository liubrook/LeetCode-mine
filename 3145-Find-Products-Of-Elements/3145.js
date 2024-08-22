// 3145. 大数组元素的乘积
// 困难
// 相关标签
// 相关企业
// 提示
// 一个非负整数 x 的 强数组 指的是满足元素为 2 的幂且元素总和为 x 的最短有序数组。下表说明了如何确定 强数组 的示例。可以证明，x 对应的强数组是独一无二的。

// 数字	二进制表示	强数组
// 1	00001[1]
// 8	01000[8]
// 10	01010[2, 8]
// 13	01101[1, 4, 8]
// 23	10111[1, 2, 4, 16]


// 我们将每一个升序的正整数 i （即1，2，3等等）的 强数组 连接得到数组 big_nums ，big_nums 开始部分为[1, 2, 1, 2, 4, 1, 4, 2, 4, 1, 2, 4, 8, ...] 。

// 给你一个二维整数数组 queries ，其中 queries[i] = [fromi, toi, modi] ，你需要计算(big_nums[fromi] * big_nums[fromi + 1] * ... * big_nums[toi]) % modi 。

// 请你返回一个整数数组 answer ，其中 answer[i] 是第 i 个查询的答案。



// 示例 1：

// 输入：queries = [[1, 3, 7]]

// 输出：[4]

// 解释：

// 只有一个查询。

// big_nums[1..3] =[2, 1, 2] 。它们的乘积为 4。结果为 4 % 7 = 4。

// 示例 2：

// 输入：queries = [[2, 5, 3], [7, 7, 4]]

// 输出：[2, 2]

// 解释：

// 有两个查询。

// 第一个查询：big_nums[2..5] =[1, 2, 4, 1] 。它们的乘积为 8 。结果为  8 % 3 = 2。

// 第二个查询：big_nums[7] = 2 。结果为 2 % 4 = 2。



// 提示：

// 1 <= queries.length <= 500
// queries[i].length == 3
// 0 <= queries[i][0] <= queries[i][1] <= 10^15
// 1 <= queries[i][2] <= 10^5

/**
 * @param {number[][]} queries
 * @return {number[]}
 */
var findProductsOfElements = function (queries) {
  let ans = [];
  for (let query of queries) {
    // 偏移让数组下标从1开始
    query[0]++;
    query[1]++;
    let l = midCheck(BigInt(query[0]));
    let r = midCheck(BigInt(query[1]));
    let mod = query[2];

    let res = 1n;
    let pre = countOne(l - 1n);
    for (let j = 0; j < 60; j++) {
      if ((1n << BigInt(j)) & l) {
        pre++;
        if (pre >= BigInt(query[0]) && pre <= BigInt(query[1])) {
          res = res * (1n << BigInt(j)) % BigInt(mod);
        }
      }
    }

    if (r > l) {
      let bac = countOne(r - 1n);
      for (let j = 0; j < 60; j++) {
        if ((1n << BigInt(j)) & r) {
          bac++;
          if (bac >= BigInt(query[0]) && bac <= BigInt(query[1])) {
            res = res * (1n << BigInt(j)) % BigInt(mod);
          }
        }
      }
    }

    if (r - l > 1n) {
      let xs = countPow(r - 1n) - countPow(l);
      res = res * powMod(2n, xs, mod) % BigInt(mod);
    }
    ans.push(Number(res));
  }

  return ans;
};

// 计算 <= x 所有数的数位1的和
function countOne(x) {
  let res = 0n;
  let sum = 0;

  for (let i = 60; i >= 0; i--) {
    if ((1n << BigInt(i)) & x) {
      res += BigInt(sum) * (1n << BigInt(i));
      sum++;

      if (i > 0) {
        res += BigInt(i) * (1n << BigInt(i - 1));
      }
    }
  }
  res += BigInt(sum);
  return res;
}

// 计算 <= x 所有数的数位对幂的贡献之和
function countPow(x) {
  let res = 0n;
  let sum = 0;

  for (let i = 60; i >= 0; i--) {
    if ((1n << BigInt(i)) & x) {
      res += BigInt(sum) * (1n << BigInt(i));
      sum += i;

      if (i > 0) {
        res += BigInt(i) * BigInt(i - 1) / 2n * (1n << BigInt(i - 1));
      }
    }
  }
  res += BigInt(sum);
  return res;
}

function powMod(x, y, mod) {
  let res = 1n;
  while (y) {
    if (y & 1n) {
      res = res * x % BigInt(mod);
    }
    x = x * x % BigInt(mod);
    y >>= 1n;
  }
  return res;
}

function midCheck(x) {
  let l = 1n, r = 1000000000000000n;
  while (l < r) {
    let mid = (l + r) >> 1n;
    if (countOne(mid) >= x) {
      r = mid;
    } else {
      l = mid + 1n;
    }
  }
  return r;
}
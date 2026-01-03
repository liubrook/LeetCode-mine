// 1390. 四因数
// 中等
// 相关标签
// conpanies icon
// 相关企业
// 提示
// 给你一个整数数组 nums，请你返回该数组中恰有四个因数的这些整数的各因数之和。如果数组中不存在满足题意的整数，则返回 0 。

// 示例 1：

// 输入：nums = [21,4,7]
// 输出：32
// 解释：
// 21 有 4 个因数：1, 3, 7, 21
// 4 有 3 个因数：1, 2, 4
// 7 有 2 个因数：1, 7
// 答案仅为 21 的所有因数的和。
// 示例 2:

// 输入: nums = [21,21]
// 输出: 64
// 示例 3:

// 输入: nums = [1,2,3,4,5]
// 输出: 0

// 提示：

// 1 <= nums.length <= 10^4
// 1 <= nums[i] <= 10^5
/**
 * @param {number[]} nums
 * @return {number}
 */
var sumFourDivisors = function (nums) {
  let totalSum = 0;
  const cache = new Map(); // 缓存: num => 四因数之和(如果不是四因数则缓存0)

  const helper = (num) => {
    if (cache.has(num)) {
      return cache.get(num);
    }

    const factors = new Set();
    for (let i = 1; i <= num; i++) {
      if (num % i === 0) {
        factors.add(i);
        factors.add(num / i);
        if (factors.size > 4) {
          cache.set(num, 0);
          return 0;
        }
      }
    }

    if (factors.size === 4) {
      let sum = 0;
      for (let factor of factors) {
        sum += factor;
      }
      cache.set(num, sum);
      return sum;
    }

    cache.set(num, 0);
    return 0;
  };

  for (let num of nums) {
    totalSum += helper(num);
  }

  return totalSum;
};

// 官方题解：枚举
var sumFourDivisors = function (nums) {
  let ans = 0;
  for (const num of nums) {
    // factor_cnt: 因数的个数
    // factor_sum: 因数的和
    let factor_cnt = 0,
      factor_sum = 0;
    for (let i = 1; i * i <= num; ++i) {
      if (num % i === 0) {
        ++factor_cnt;
        factor_sum += i;
        if (i * i !== num) {
          // 判断 i 和 num/i是否相等, 若不相等才能将num/i看成新的因数
          ++factor_cnt;
          factor_sum += num / i;
        }
      }
    }
    if (factor_cnt === 4) {
      ans += factor_sum;
    }
  }
  return ans;
};

// 枚举-剪枝+缓存 优化
var sumFourDivisors = function (nums) {
  let ans = 0;
  // 缓存: key为数字num, value为其四因数之和(不符合则为0)
  const memo = new Map();

  for (const num of nums) {
    if (memo.has(num)) {
      ans += memo.get(num);
      continue;
    }

    let factor_cnt = 0,
      factor_sum = 0;
    for (let i = 1; i * i <= num; ++i) {
      if (num % i === 0) {
        // 处理第一个因数 i
        ++factor_cnt;
        factor_sum += i;
        // 提前剪枝: 如果仅考虑i, 数量就已超过4
        if (factor_cnt > 4) break;

        // 处理与i配对的另一个因数(如果它们不相等)
        if (i * i !== num) {
          ++factor_cnt;
          factor_sum += num / i;
          // 再次检查: 处理完一对后, 数量是否超过4
          if (factor_cnt > 4) break;
        }
      }
    }

    const currentSum = factor_cnt === 4 ? factor_sum : 0;
    ans += currentSum;
    memo.set(num, currentSum);
  }
  return ans;
};

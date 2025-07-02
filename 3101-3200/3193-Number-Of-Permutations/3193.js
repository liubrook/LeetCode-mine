// 3193. 统计逆序对的数目
// 困难
// 相关标签
// 相关企业
// 提示
// 给你一个整数 n 和一个二维数组 requirements ，其中 requirements[i] = [endi, cnti] 表示这个要求中的末尾下标和 逆序对 的数目。

// 整数数组 nums 中一个下标对(i, j) 如果满足以下条件，那么它们被称为一个 逆序对 ：

// i < j 且 nums[i] > nums[j]
// 请你返回[0, 1, 2, ..., n - 1]的
// 排列
//  perm 的数目，满足对 所有 的 requirements[i] 都有 perm[0..endi] 恰好有 cnti 个逆序对。

// 由于答案可能会很大，将它对 109 + 7 取余 后返回。



// 示例 1：

// 输入：n = 3, requirements = [[2, 2], [0, 0]]

// 输出：2

// 解释：

// 两个排列为：

// [2, 0, 1]
// 前缀[2, 0, 1] 的逆序对为(0, 1) 和(0, 2) 。
// 前缀[2] 的逆序对数目为 0 个。
// [1, 2, 0]
// 前缀[1, 2, 0] 的逆序对为(0, 2) 和(1, 2) 。
// 前缀[1] 的逆序对数目为 0 个。
// 示例 2：

// 输入：n = 3, requirements = [[2, 2], [1, 1], [0, 0]]

// 输出：1

// 解释：

// 唯一满足要求的排列是[2, 0, 1] ：

// 前缀[2, 0, 1] 的逆序对为(0, 1) 和(0, 2) 。
// 前缀[2, 0] 的逆序对为(0, 1) 。
// 前缀[2] 的逆序对数目为 0 。
// 示例 3：

// 输入：n = 2, requirements = [[0, 0], [1, 0]]

// 输出：1

// 解释：

// 唯一满足要求的排列为[0, 1] ：

// 前缀[0] 的逆序对数目为 0 。
// 前缀[0, 1] 的逆序对为(0, 1) 。



// 提示：

// 2 <= n <= 300
// 1 <= requirements.length <= n
// requirements[i] = [endi, cnti]
// 0 <= endi <= n - 1
// 0 <= cnti <= 400
// 输入保证至少有一个 i 满足 endi == n - 1 。
// 输入保证所有的 endi 互不相同。

/**
 * @param {number} n
 * @param {number[][]} requirements
 * @return {number}
 */
const MOD = 1e9 + 7;

var numberOfPermutations = function (n, requirements) {
  const reqMap = { 0: 0 };
  let maxCnt = 0;
  requirements.forEach(([end, cnt]) => {
    reqMap[end] = cnt;
    maxCnt = Math.max(maxCnt, cnt);
  });
  if (reqMap[0] !== 0) {
    return 0;
  }
  const dp = Array.from({ length: n }, () => Array(maxCnt + 1).fill(-1));

  function dfs(end, cnt) {
    if (end === 0) {
      return 1;
    }
    if (dp[end][cnt] !== -1) {
      return dp[end][cnt];
    }
    if (reqMap.hasOwnProperty(end - 1)) {
      const r = reqMap[end - 1];
      if (r <= cnt && cnt <= end + r) {
        dp[end][cnt] = dfs(end - 1, r);
        return dp[end][cnt];
      }
      return 0;
    }

    let totSum = 0;
    for (let i = 0; i <= Math.min(end, cnt); i++) {
      totSum = (totSum + dfs(end - 1, cnt - i)) % MOD;
    }
    dp[end][cnt] = totSum;
    return dp[end][cnt];
  }

  return dfs(n - 1, reqMap[n - 1]);
};
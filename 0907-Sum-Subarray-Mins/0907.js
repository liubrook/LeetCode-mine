// 907. 子数组的最小值之和
// 给定一个整数数组 arr，找到 min(b) 的总和，其中 b 的范围为 arr 的每个（连续）子数组。

// 由于答案可能很大，因此 返回答案模 10 ^ 9 + 7 。



// 示例 1：

// 输入：arr = [3, 1, 2, 4]
// 输出：17
// 解释：
// 子数组为[3]，[1]，[2]，[4]，[3, 1]，[1, 2]，[2, 4]，[3, 1, 2]，[1, 2, 4]，[3, 1, 2, 4]。 
// 最小值为 3，1，2，4，1，1，2，1，1，1，和为 17。
// 示例 2：

// 输入：arr = [11, 81, 94, 43, 3]
// 输出：444


// 提示：

// 1 <= arr.length <= 3 * 104
// 1 <= arr[i] <= 3 * 104

/**
 * @param {number[]} arr
 * @return {number}
 */
var sumSubarrayMins = function (arr) {
  const n = arr.length;
  let ans = 0;
  const MOD = 1000000007;
  const monoStack = [];
  const dp = new Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    while (monoStack.length !== 0 && arr[monoStack[monoStack.length - 1]] > arr[i]) {
      monoStack.pop();
    }
    const k = monoStack.length === 0 ? (i + 1) : (i - monoStack[monoStack.length - 1]);
    dp[i] = k * arr[i] + (monoStack.length === 0 ? 0 : dp[i - k]);
    ans = (ans + dp[i]) % MOD;
    monoStack.push(i);
  }
  return ans;
};
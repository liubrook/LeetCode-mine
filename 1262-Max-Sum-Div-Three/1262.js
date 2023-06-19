// 1262. 可被三整除的最大和
// 给你一个整数数组 nums，请你找出并返回能被三整除的元素最大和。



// 示例 1：

// 输入：nums = [3, 6, 5, 1, 8]
// 输出：18
// 解释：选出数字 3, 6, 1 和 8，它们的和是 18（可被 3 整除的最大和）。
// 示例 2：

// 输入：nums = [4]
// 输出：0
// 解释：4 不能被 3 整除，所以无法选出数字，返回 0。
// 示例 3：

// 输入：nums = [1, 2, 3, 4, 4]
// 输出：12
// 解释：选出数字 1, 3, 4 以及 4，它们的和是 12（可被 3 整除的最大和）。


// 提示：

// 1 <= nums.length <= 4 * 10 ^ 4
// 1 <= nums[i] <= 10 ^ 4


/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function (nums) {
  const v = [[], [], []];
  for (const num of nums) {
    v[num % 3].push(num);
  }
  v[1].sort((a, b) => b - a);
  v[2].sort((a, b) => b - a);

  let ans = 0;
  const lb = v[1].length;
  const lc = v[2].length;
  for (let cntb = lb - 2; cntb <= lb; ++cntb) {
    if (cntb >= 0) {
      for (let cntc = lc - 2; cntc <= lc; ++cntc) {
        if (cntc >= 0 && (cntb - cntc) % 3 === 0) {
          ans = Math.max(ans, getSum(v[1], 0, cntb) + getSum(v[2], 0, cntc));
        }
      }
    }
  }
  return ans + getSum(v[0], 0, v[0].length);
}

const getSum = (list, start, end) => {
  let sum = 0;
  for (let i = start; i < end; ++i) {
    sum += list[i];
  }
  return sum;
};
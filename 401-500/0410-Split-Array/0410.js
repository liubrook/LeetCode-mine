// 410. 分割数组的最大值
// 困难
// 相关标签
// 相关企业
// 给定一个非负整数数组 nums 和一个整数 k ，你需要将这个数组分成 k 个非空的连续子数组。

// 设计一个算法使得这 k 个子数组各自和的最大值最小。



// 示例 1：

// 输入：nums = [7, 2, 5, 10, 8], k = 2
// 输出：18
// 解释：
// 一共有四种方法将 nums 分割为 2 个子数组。
// 其中最好的方式是将其分为[7, 2, 5] 和[10, 8] 。
// 因为此时这两个子数组各自的和的最大值为18，在所有情况中最小。
// 示例 2：

// 输入：nums = [1, 2, 3, 4, 5], k = 2
// 输出：9
// 示例 3：

// 输入：nums = [1, 4, 4], k = 3
// 输出：4


// 提示：

// 1 <= nums.length <= 1000
// 0 <= nums[i] <= 10^6
// 1 <= k <= min(50, nums.length)


/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var splitArray = function (nums, k) {
  let max = 0
  sum = 0;
  for (let i = 0; i < nums.length; i++) {
    if (max < nums[i]) max = nums[i];
    sum += nums[i];
  }

  while (max < sum) {
    let mid = parseInt((sum - max) / 2, 10) + max;
    // 随机选择的值成立则这个值默认为最大的可能结果继续查找
    if (check(nums, mid, k)) {
      sum = mid;
    } else {
      // 不满足，重置最小可能结果
      max = mid + 1;
    }
  }



  function check(nums, val, m) {
    let sum = 0,
      index = 1;
    for (let i = 0; i < nums.length; i++) {
      // 如果分段和大于了假设的结果说明，i是该分段的终点，形成一个分段
      // index记录+1，i就成了下一个分段的起点（重置sum）开始校验下一个分段
      if (sum + nums[i] > val) {
        index++;
        sum = nums[i];
      } else {
        sum += nums[i];
      }
    }
    // 如果index即分段数量满足小于等于m则说明这个假设值成立
    return index <= m;
  }

  // 返回最小可能结果
  return max;
};
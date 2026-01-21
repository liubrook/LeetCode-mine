// 3507. 移除最小数对使数组有序 I
// 简单
// 相关标签
// premium lock icon
// 相关企业
// 提示
// 给你一个数组 nums，你可以执行以下操作任意次数：

// 选择 相邻 元素对中 和最小 的一对。如果存在多个这样的对，选择最左边的一个。
// 用它们的和替换这对元素。
// 返回将数组变为 非递减 所需的 最小操作次数 。

// 如果一个数组中每个元素都大于或等于它前一个元素（如果存在的话），则称该数组为非递减。

// 示例 1：

// 输入： nums = [5,2,3,1]

// 输出： 2

// 解释：

// 元素对 (3,1) 的和最小，为 4。替换后 nums = [5,2,4]。
// 元素对 (2,4) 的和为 6。替换后 nums = [5,6]。
// 数组 nums 在两次操作后变为非递减。

// 示例 2：

// 输入： nums = [1,2,2]

// 输出： 0

// 解释：

// 数组 nums 已经是非递减的。

// 提示：

// 1 <= nums.length <= 50
// -1000 <= nums[i] <= 1000
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumPairRemoval = function (nums) {
  let count = 0;

  while (nums.length > 1) {
    let isAscending = true;
    let minSum = Infinity;
    let targetIndex = -1;

    for (let i = 0; i < nums.length - 1; i++) {
      const sum = nums[i] + nums[i + 1];

      if (nums[i] > nums[i + 1]) {
        isAscending = false;
      }

      if (sum < minSum) {
        minSum = sum;
        targetIndex = i;
      }
    }

    if (isAscending) {
      break;
    }

    count++;
    nums[targetIndex] = minSum;
    nums.splice(targetIndex + 1, 1);
  }

  return count;
};

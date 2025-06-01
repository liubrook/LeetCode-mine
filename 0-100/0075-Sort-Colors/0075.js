// 75. 颜色分类
// 已解答
// 中等
// 相关标签
// 相关企业
// 提示
// 给定一个包含红色、白色和蓝色、共 n 个元素的数组 nums ，原地 对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

// 我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

// 必须在不使用库内置的 sort 函数的情况下解决这个问题。



// 示例 1：

// 输入：nums = [2,0,2,1,1,0]
// 输出：[0,0,1,1,2,2]
// 示例 2：

// 输入：nums = [2,0,1]
// 输出：[0,1,2]


// 提示：

// n == nums.length
// 1 <= n <= 300
// nums[i] 为 0、1 或 2


// 进阶：

// 你能想出一个仅使用常数空间的一趟扫描算法吗？

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let left = 0, right = nums.length - 1, curr = 0;
  while (curr <= right) {
    if (nums[curr] === 0) {
      [nums[curr], nums[left]] = [nums[left], nums[curr]];
      //这里为什么可以自信的直接加1而不检测被调换过来的数字呢？我们可以假设被换过来的数字可能为1，2；但是如果这个数字是2，那么在之前的循环中已经被移动末尾了，所以这个数组只可能是1.
      left++;
      curr++;
      continue;
    }
    if (nums[curr] === 2) {
      [nums[curr], nums[right]] = [nums[right], nums[curr]];
      right--;
      continue;
    }
    if (nums[curr] === 1) {
      curr++;
      continue;
    }

  }
  return nums
};
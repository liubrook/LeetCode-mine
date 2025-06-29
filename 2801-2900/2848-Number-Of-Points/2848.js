// 2848. 与车相交的点
// 简单
// 相关标签
// 相关企业
// 提示
// 给你一个下标从 0 开始的二维整数数组 nums 表示汽车停放在数轴上的坐标。对于任意下标 i，nums[i] = [starti, endi] ，其中 starti 是第 i 辆车的起点，endi 是第 i 辆车的终点。

// 返回数轴上被车 任意部分 覆盖的整数点的数目。



// 示例 1：

// 输入：nums = [[3, 6], [1, 5], [4, 7]]
// 输出：7
// 解释：从 1 到 7 的所有点都至少与一辆车相交，因此答案为 7 。
// 示例 2：

// 输入：nums = [[1, 3], [5, 8]]
// 输出：7
// 解释：1、2、3、5、6、7、8 共计 7 个点满足至少与一辆车相交，因此答案为 7 。


// 提示：

// 1 <= nums.length <= 100
// nums[i].length == 2
// 1 <= starti <= endi <= 100

/**
 * @param {number[][]} nums
 * @return {number}
 */
var numberOfPoints = function (nums) {
  let C = 0;
  for (const interval of nums) {
    C = Math.max(C, interval[1]);
  }

  const diff = new Array(C + 2).fill(0);
  for (const interval of nums) {
    diff[interval[0]]++;
    diff[interval[1] + 1]--;
  }

  let ans = 0, count = 0;
  for (let i = 1; i <= C; i++) {
    count += diff[i];
    if (count > 0) {
      ans++;
    }
  }

  return ans;
};
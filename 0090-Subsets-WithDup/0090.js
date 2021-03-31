// 90. 子集 II
// 给你一个整数数组 nums ，其中可能包含重复元素，请你返回该数组所有可能的子集（幂集）。

// 解集 不能 包含重复的子集。返回的解集中，子集可以按 任意顺序 排列。



// 示例 1：

// 输入：nums = [1, 2, 2]
// 输出：[[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]
// 示例 2：

// 输入：nums = [0]
// 输出：[[], [0]]


// 提示：

// 1 <= nums.length <= 10
//   - 10 <= nums[i] <= 10

var subsetsWithDup = function (nums) {
  nums.sort((a, b) => a - b);
  let t = [], ans = [];
  const n = nums.length;
  for (let mask = 0; mask < (1 << n); ++mask) {
    t = [];
    let flag = true;
    for (let i = 0; i < n; ++i) {
      if ((mask & (1 << i)) != 0) {
        if (i > 0 && (mask >> (i - 1) & 1) == 0 && nums[i] == nums[i - 1]) {
          flag = false;
          break;
        }
        t.push(nums[i]);
      }
    }
    if (flag) {
      ans.push(t.slice());
    }
  }
  return ans;
}
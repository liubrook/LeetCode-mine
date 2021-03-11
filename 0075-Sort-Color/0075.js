// 75. 颜色分类
// 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。

// 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。

 

// 示例 1：

// 输入：nums = [2,0,2,1,1,0]
// 输出：[0,0,1,1,2,2]
// 示例 2：

// 输入：nums = [2,0,1]
// 输出：[0,1,2]
// 示例 3：

// 输入：nums = [0]
// 输出：[0]
// 示例 4：

// 输入：nums = [1]
// 输出：[1]
 

// 提示：

// n == nums.length
// 1 <= n <= 300
// nums[i] 为 0、1 或 2

// 单指针
var sortColors = function(nums) {
  const n = nums.length;
  let ptr = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] === 0) {
      [nums[i], nums[ptr]] = [nums[ptr], nums[i]];
      ptr++;
    }
  }
  for (let i = ptr; i < n; i++) {
    if (nums[i] === 1) {
      [nums[i], nums[ptr]] = [nums[ptr], nums[i]];
      ptr++;
    }
  }
  return nums;
}

// 双指针
var sortColors1 = function(nums) {
  const n = nums.length;
  let p0 = 0, p1 = 0;
  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) {
      [nums[i], nums[p1]] = [nums[p1], nums[i]];
      p1++;
    } else if (nums[i] === 0) {
      [nums[i], nums[p0]] = [nums[p0], nums[i]];
      if (p0 < p1) {
        [nums[i], nums[p1]] = [nums[p1], nums[i]];
      }
      p0++;
      p1++;
    }
  }
  return nums;
}

// i 0
// p0 0
// p1 0
// nums [ 2, 0, 2, 1, 1, 0 ]
// i 1
// p0 1
// p1 1
// nums [ 0, 2, 2, 1, 1, 0 ]
// i 2
// p0 1
// p1 1
// nums [ 0, 2, 2, 1, 1, 0 ]
// i 3
// p0 1
// p1 2
// nums [ 0, 1, 2, 2, 1, 0 ]
// i 4
// p0 1
// p1 3
// nums [ 0, 1, 1, 2, 2, 0 ]
// i 5
// p0 2
// p1 4
// nums [ 0, 0, 1, 1, 2, 2 ]


// 双指针
var sortColors2 = function(nums) {
  const n = nums.length;
  let left = 0, right = n - 1;
  let i = 0;
  while(i <= right) {
    while(i <= right && nums[i] === 2) {
      [nums[i], nums[right]] = [nums[right], nums[i]];
      right--;
    }
    if (nums[i] === 0) {
      [nums[i], nums[left]] = [nums[left], nums[i]];
      left++;
    }
    i++;
  }
  return nums;
}
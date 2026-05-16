var findMin = function (nums) {
  let left = -1,
    right = nums.length - 1; // 开区间 (-1, n-1)
  while (left + 1 < right) {
    // 开区间不为空
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] === nums[right]) {
      right--;
    } else if (nums[mid] < nums[right]) {
      right = mid;
    } else {
      left = mid;
    }
  }
  return nums[right];
};

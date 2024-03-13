// 

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxArrayValue = function (nums) {
  let sum = nums[nums.length - 1];
  for (let i = nums.length - 2; i >= 0; i--) {
    sum = nums[i] <= sum ? nums[i] + sum : nums[i];
  }
  return sum;
};
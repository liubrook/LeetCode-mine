// 16. 最接近的三数之和
// 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。

 

// 示例：

// 输入：nums = [-1,2,1,-4], target = 1
// 输出：2
// 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
 

// 提示：

// 3 <= nums.length <= 10^3
// -10^3 <= nums[i] <= 10^3
// -10^4 <= target <= 10^4
var threeSumClosest = function(nums, target) {
    let l  = nums.length;
    let res = nums[0] + nums[1] + nums[2];
    for(let i = 0; i < l - 2; i++) {
        for(let j = i + 1; j < l - 1; j++) {
            for(let k = j + 1; k < l; k++){
                const sum = nums[i] + nums[j] + nums[k]
                if (Math.abs(target - res) > Math.abs(target - sum)) {
                    res = sum
                }
            }
        }
    }
    return res
}
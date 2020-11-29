// 1. 两数之和 简单
// 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和
//为目标值的那 两个 整数，并返回他们的数组下标。你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

// 示例:

//给定 nums = [2, 7, 11, 15], target = 9

//因为 nums[0] + nums[1] = 2 + 7 = 9
//所以返回 [0, 1]


// 1
var twoSum1 = function(nums, target) {
    let temp = [];
    for (let i = 0; i < nums.length; i++) {
        let dif = target - nums[i];
        if (temp[dif] !== undefined) {
            return [temp[dif], i]
        }
        temp[nums[i]] = i
    }
}

// 2
var twoSum2 = function(nums, target) {
    let map = {}; // key数字 value下标
    let loop = 0; // 循环次数
    let dis; // 目标与当前值的差
    while(loop < nums.length) {
        dis = target - nums[loop];
        if (map[dis] != undefined) {
            return [map[dis], loop]
        }
        map[nums[loop]] = loop;
        loop++;
    }
}

const nums = [2, 7, 11, 15], target = 9

console.log(twoSum1(nums, target))
// 315. 计算右侧小于当前元素的个数
// 给定一个整数数组 nums，按要求返回一个新数组 counts。数组 counts 有该性质： counts[i] 的值是  nums[i] 右侧小于 nums[i] 的元素的数量。

// 示例:

// 输入: [5,2,6,1]
// 输出: [2,1,1,0] 
// 解释:
// 5 的右侧有 2 个更小的元素 (2 和 1).
// 2 的右侧仅有 1 个更小的元素 (1).
// 6 的右侧有 1 个更小的元素 (1).
// 1 的右侧有 0 个更小的元素.

// 二分查找
var countSmaller = function (nums) {
    const len = nums.length;
    if (len === 0) return nums;
    const res = new Array(len);
    const sorted = [];
    for(let i = len - 1; i >= 0; i--) {
        const index= findIndex(sorted, nums[i]); // 当前数字理应出现在右边排序后的位置，也即是有index个右边元素比它小
        sorted.splice(index, 0, nums[i]); // 将nums[i]插入到sorted数组的index处
        res[i] = index; // 将index存到counts数组的索引处
    }
    return res;
}

const findIndex = (arr, target) => {
    let lo = 0;
    let hi = arr.length - 1;
    while (lo < hi) {
        const mid = (lo + hi) >>> 1; // 整体右移1位
        if (arr[mid] < target) { // 目标值比mid元素大，mid不是想要的
            lo = mid + 1; // 移到mid+1，lo是我最后想返回的
        } else { // 目标值小于等于mid元素
            hi = mid; // mid可能是想要的，hi不能移到mid - 1
        }
    }
    if (arr[lo] < target) return lo + 1; // 目标值比lo元素大，lo还需+1;
    return lo; // 否则返回lo
}


// 归并排序
const countSmaller1 = (nums) => {
    const counts = new Array(nums.length).fill(0);
    let indexedNums = new Array(nums.length); // indexedNums[i]包含元素的位置信息
    for(let i = 0; i < indexedNums.length; i++) { //
        indexedNums[i] = {
            value: nums[i],
            index: i
        }
    }
    const mergeSort = (left, right) => {
        if (right - left <= 1) return indexedNums.slice(left, right);
        const pivot =  (left + right) >>> 1;
        const leftPart = mergeSort(left, pivot);
        const rightPart = mergeSort(pivot, right);
        const merged = [];
        let i = 0;
        let j = 0;
        while(i < leftPart.length) { // 遍历左边的元素
            while(j < rightPart.length && rightPart[j].value < leftPart[i].value) {
                // 考察右边部分的元素，遇到小于当前左边元素的，推入merged数组
                merged.push(rightPart[j]);
                j++; // 统计当前右边元素中，比当前左边元素小的元素个数
            }
            counts[leftPart[i].index] += j; // 在递归中累加j，统计处右边元素比它小的个数
            merged.push(leftPart[i]); // 较小的进来后，自己也进入了
            i++; // 考察下一个左边元素
        }
        // rightPart[j]比左边元素都大，while结束，将它和它后面的元素推入merged数组，继续递归
        merged.push(...rightPart.slice(j));
        return merged;
    }
    mergeSort(0, indexedNums.length);
    return counts;
}


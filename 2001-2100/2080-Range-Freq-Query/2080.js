// 2080. 区间内查询数字的频率
// 中等
// 相关标签
// 相关企业
// 提示
// 请你设计一个数据结构，它能求出给定子数组内一个给定值的 频率 。

// 子数组中一个值的 频率 指的是这个子数组中这个值的出现次数。

// 请你实现 RangeFreqQuery 类：

// RangeFreqQuery(int[] arr) 用下标从 0 开始的整数数组 arr 构造一个类的实例。
// int query(int left, int right, int value) 返回子数组 arr[left...right] 中 value 的 频率 。
// 一个 子数组 指的是数组中一段连续的元素。arr[left...right] 指的是 nums 中包含下标 left 和 right 在内 的中间一段连续元素。



// 示例 1：

// 输入：
// ["RangeFreqQuery", "query", "query"]
// [[[12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]], [1, 2, 4], [0, 11, 33]]
// 输出：
// [null, 1, 2]

// 解释：
// RangeFreqQuery rangeFreqQuery = new RangeFreqQuery([12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]);
// rangeFreqQuery.query(1, 2, 4); // 返回 1 。4 在子数组 [33, 4] 中出现 1 次。
// rangeFreqQuery.query(0, 11, 33); // 返回 2 。33 在整个子数组中出现 2 次。


// 提示：

// 1 <= arr.length <= 10^5
// 1 <= arr[i], value <= 10^4
// 0 <= left <= right < arr.length
// 调用 query 不超过 10^5 次。

/**
 * @param {number[]} arr
 */
var RangeFreqQuery = function (arr) {
  // 数值为键，出现下标数组为值的哈希表
  this.occurrence = {};
  // 顺序遍历数组初始化哈希表
  for (let i = 0; i < arr.length; ++i) {
    if (!this.occurrence[arr[i]]) {
      this.occurrence[arr[i]] = [];
    }
    this.occurrence[arr[i]].push(i);
  }
};

/** 
 * @param {number} left 
 * @param {number} right 
 * @param {number} value
 * @return {number}
 */
RangeFreqQuery.prototype.query = function (left, right, value) {
  // 查找对应的出现下标数组，不存在则为空
  const pos = this.occurrence[value] || [];
  // 两次二分查找计算子数组内出现次数
  const l = lowerBound(pos, left);
  const r = upperBound(pos, right);
  return r - l;
};

const lowerBound = (pos, target) => {
  let low = 0, high = pos.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (pos[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low;
}

const upperBound = (pos, target) => {
  let low = 0, high = pos.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (pos[mid] <= target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return low;
}

/** 
 * Your RangeFreqQuery object will be instantiated and called as such:
 * var obj = new RangeFreqQuery(arr)
 * var param_1 = obj.query(left,right,value)
 */